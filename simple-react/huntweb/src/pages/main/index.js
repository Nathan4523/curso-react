import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Main extends Component{
    //para armazenar da melhor maneira, ideal é usar o state (já do react)
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        /**
         * esse const, serve para economizar codigo, ficaria assim
         * response.data.docs
         * response.data.productInfo
         * */
        const { docs, ...productInfo } = response.data;

        //para inserir dados no this.state, é com setState
        this.setState({ products: docs, productInfo, page });
    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page == 1) return;

        const pageNumber = page - 1;
         this.loadProducts(pageNumber);
    }
    
    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page == productInfo.pages) return;

        const pageNumber = page +  1;

        this.loadProducts(pageNumber);
    }

    //render fica escutando as variaveis 
    render(){
        const { products, productInfo, page } = this.state;
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={ product._id }>
                        <strong>{ product.title }</strong>
                        <p>{ product.description }</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button onClick={ this.prevPage } disabled={ page == 1 }>Anterior</button>
                    <button onClick={ this.nextPage } disabled={ page  == productInfo.pages }>Proximo</button>
                </div>
            </div>
        );
    }
}