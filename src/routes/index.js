import OderPage from "../OrderPage/OrderPage";
import ProductPage from "../ProductPage/ProductPage";
import Home from "../page/HomePage/Home";
import Login from "../page/Login"
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import Register from "../page/Register"
import TypeProductPage from "../page/TypeProductPage/TypeProductPage.jsx";
import SignInPage from "../page/SignInPage/SignInPage.jsx"
import SignUpPage from "../page/SignUpPage/SignUpPage.jsx"
import ProductDetails from "../page/ProductDetailsPage/ProductDetailsPage.jsx"
export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OderPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true
    },
    {
        path: '/product-details',
        page: ProductDetails,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Login,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]