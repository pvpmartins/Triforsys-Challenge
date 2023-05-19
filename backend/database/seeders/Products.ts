import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
import User from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        nome: 'PS3',
        preco: 3000,
        qtd: 20,
      },
      {
        nome: 'PC',
        preco: 3000,
        qtd: 2,
      },
      {
        nome: 'TV LED',
        preco: 3000,
        qtd: 500,
      },
      {
        nome: 'Notebook',
        preco: 3000,
        qtd: 45,
      },
      {
        nome: 'Iphone',
        preco: 3000,
        qtd: 90,
      },
    ])
  }
}
