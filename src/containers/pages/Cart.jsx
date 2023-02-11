import React, { useEffect, useState } from 'react'
import Layout from '../../hocs/Layout';
import { connect } from 'react-redux';
import {get_items, get_total, get_item_total, remove_item, update_item} from '../../redux/actions/cart'
import CartItem from '../../components/cart/CartItem';
import { setAlert } from '../../redux/actions/alert';
import { Link } from 'react-router-dom'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'

const Cart = ({
    remove_item,
    update_item,
    get_items, 
    get_total, 
    get_item_total,
    isAuthenticated,
    items,
    amount,
    compare_amount,
    total_items,
    setAlert
}) => {
    

    const products = [
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          price: '$32.00',
          color: 'Sienna',
          inStock: true,
          size: 'Large',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in sienna.",
        },
        {
          id: 2,
          name: 'Basic Tee',
          href: '#',
          price: '$32.00',
          color: 'Black',
          inStock: false,
          leadTime: '3–4 weeks',
          size: 'Large',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
        },
        {
          id: 3,
          name: 'Nomad Tumbler',
          href: '#',
          price: '$35.00',
          color: 'White',
          inStock: true,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
          imageAlt: 'Insulated bottle with white base and black snap lid.',
        },
      ]


    const [render, setRender] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0);
        get_items() 
        get_total() 
        get_item_total()
    }, [render])


    const showItems = () => {
        return(
            <div>
                <h4>Tienes {total_items} item(s) en total</h4>
                {
                    items &&
                    items !== null &&
                    items !== undefined &&
                    items.length !== 0 && 
                    items.map((item, index) => {
                        
                        let count = item.count;
                        return (
                            <div key={index}>
                                <CartItem 
                                    item={item} 
                                    count={count} 
                                    update_item={update_item} 
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                    setAlert={setAlert}
                                />
                            </div>
                        )

                    })
                }
            </div>
        )
    }

    const checkoutButton = () => {
        if (total_items < 1){
            return(
                <Link to="/cart">
                <button 
                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                    Busca mas productos
                </button>   
            </Link>
            )

        }else if(!isAuthenticated){
        
        return(
            <Link to="/login">
            <button 
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Loguea para realizar una compra
            </button>   
        </Link>
        )
       
        }else{
        return(
            <Link to="/checkout">
                <button 
                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                    Checkout
                </button>   
            </Link>
        )
       
        }
    }

    return (
        <Layout>
        <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart Items ({total_items})</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {
                                    showItems()
                                }
                            </ul>
                        </section>

                
                {/* Order summary */}
                <section
                aria-labelledby="summary-heading"
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                >
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                    Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${compare_amount.toFixed(2)}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${amount.toFixed(2)}</dd>
                    </div>
                </dl>

                <div className="mt-6">
                    {checkoutButton()}
                </div>
                </section>
            </form>
            </div>
        </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items
})

export default connect (mapStateToProps, {
    get_items, 
    get_total, 
    get_item_total,
    remove_item,
    update_item,
    setAlert
}) (Cart)