import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService, { ProductData } from 'App/Services/ProductService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1) // get the page number, default is 1
    const limit = request.input('limit', 10)

    const products = await ProductService.getAllProducts(page, limit)

    return response.json(products)
  }

  public async store({ request, response }: HttpContextContract) {
    const productData: ProductData = request.only(['nome', 'preco', 'qtd'])

    const productSchema = schema.create({
      nome: schema.string({}, [rules.required(), rules.maxLength(255)]),
      // preco: schema.number([rules.required(), rules.range(0, Infinity)]),
      // qtd: schema.number([rules.required(), rules.range(1, Infinity)]),
    })

    try {
      // Validate the product data
      await request.validate({
        schema: productSchema,
        messages: {
          'nome.required': 'Insira um nome',
          'nome.maxLength': 'Insira menos de 255 caracteres',
          'qtd.range': 'Insira um valor maior do que 0',
          'qtd.required': 'Insira um valor maior do que 0',
          'preco.range': 'Insira um valor maior do que 0',
          'preco.required': 'Insira um valor maior do que 0',
        },
      })
    } catch (error) {
      return response.status(400).json({ message: error.messages })
    }

    // Create the product
    const product = await ProductService.createProduct(productData)

    return response.status(201).json(product)
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await ProductService.getProductById(params.id)

    if (!product) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }

    return response.json(product)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const productData = request.only(['nome', 'preco', 'qtd'])
    console.log(params.id)

    const productSchema = schema.create({
      nome: schema.string(),
      preco: schema.number([rules.required(), rules.range(0, Infinity)]),
      qtd: schema.number([rules.required(), rules.range(1, Infinity)]),
    })

    try {
      // Validate the product data
      await request.validate({ schema: productSchema })
    } catch (error) {
      return response.status(400).json({ message: error.messages })
    }

    const product = await ProductService.updateProduct(params.id, productData)
    if (!product) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }

    return response.json(product)
  }

  public async destroy({ params, response }: HttpContextContract) {
    await ProductService.deleteProduct(params.id)

    return response.status(204).send('Produto deletado!')
  }
}
