import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../store/reducers/products";



const Products = () => {

    const MAX_LENGTH = 20;
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);



    return (
        <div className="products">
            {
                data.map((product) => (
                    <div key={product} className="products__block">
                        <img src={product.img} width="300" height="300" alt=""/>
                        <div className="products__inner">
                            <div className="products__information">
                                <h2 className="products__title">
                                    {product.title.length > MAX_LENGTH
                                        ? `${product.title.slice(0, MAX_LENGTH)}...`
                                        : product.title}
                                </h2>
                                <p className="products__ingredients">
                                    {
                                        product.ingredients && product.ingredients.length > 4
                                            ? `${product.ingredients.slice(0, 4).join(", ")}...`
                                            : product.ingredients?.length
                                                ? product.ingredients.join(", ")
                                                : "Нет ингредиентов"
                                    }

                                </p>
                            </div>
                            <div className="products__actions">
                                <button className="products__button button">
                                    Купить
                                </button>
                                <p className="products__price">
                                   от {product.price} ₽
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Products;