import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  // This code block uses the `useEffect()` hook to dispatch the `listProducts()` action to the Redux store when the component is mounted or when the `dispatch` function changes. 
  // This ensures that the products are loaded from the server when the component is rendered.

  // The `useEffect()` hook takes two arguments: a function to execute when the component is mounted, 
  // and an array of dependencies. The `dispatch` function is passed as a dependency to ensure that the `listProducts()` action is dispatched only when `dispatch` changes.
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  // If `loading` is true, the `Loader` component is displayed. 
  // If an `error` occurred, the `Message` component is displayed with the error message. 
  // Otherwise, the list of `Product` components is displayed using the `products` array from the Redux store.
  //  The `map()` method is used to iterate through the `products` array and render a `Product` component for each product.
  //  A `key` prop is assigned to each `Col`component to avoid warnings in the console
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product, indx) => (
            <Col key={indx} sm={10} md={200} lg={2} xl={3}>
                {/* <div>Product{indx}</div> */}
                <Product singleItem={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen