import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'

export interface ProductData {
  nome: string
  preco: number
  qtd: number
}

export default class ProductService {
  public static async getAllProducts(page, limit) {
    const result = await Database.from('products').paginate(page, limit)
    const result2 = await Product.all()
    const resultJson = result.toJSON()

    const totalQtd = result2.reduce((total, product) => total + product.qtd, 0)

    return {
      ...resultJson,
      meta: {
        ...resultJson.meta,
        totalItemsQtd: totalQtd,
      },
    }
  }

  public static async getProductById(id: number) {
    return await Product.find(id)
  }

  public static async createProduct(productData: ProductData) {
    return await Product.create(productData)
  }

  public static async updateProduct(id: number, productData: ProductData) {
    const product = await Product.find(id)
    if (product) {
      product.merge(productData)
      await product.save()
      return product
    }
    return null
  }

  public static async deleteProduct(id: number) {
    const product = await Product.find(id)
    if (product) {
      await product.delete()
    }
  }
}
