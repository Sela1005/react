import React from 'react'
import ProductDetailsComponent from '../../component/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  return (
    <div style={{padding: '0 120px', backgroundColor: '#f0f0f0',height:'1000px'}}>
      <h10>Sách tiếng việt - văn học - Tiểu thuyết  </h10>
      <div style={{display:'flex', background: '#fff',borderRadius:'10px'}}>
          <ProductDetailsComponent/>
      </div>
    </div>
  )
}

export default ProductDetailsPage