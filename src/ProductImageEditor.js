import React, { useState, useRef, useEffect } from "react";

const ProductImageEditor = ({updateProduct, product}) => {
    const [data, setData] = useState('')

    const el = useRef()

    useEffect(() => {
        el.current.addEventListener('change', (event) => {
            const file = event.target.files[0]
            console.log(file)
            setData(file)
        })
    })

    const changeImg = () => {
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.addEventListener('load', async() => {
            product = {...product, image: reader.result}
            await updateProduct(product)
        })
        setData('')
        el.current.value = ''
    }

    return (
        <div>
            <input type="file" ref={el}/>
            <br/>
            {
                data ? <button onClick={() => {changeImg()}}>Submit</button> : null
            }
        </div>
    )

}

export default ProductImageEditor