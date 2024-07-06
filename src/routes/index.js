import OderPage from "../OrderPage/OrderPage";
import ProductPage from "../ProductPage/ProductPage";
import Home from "../page/HomePage/Home";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import TypeProductPage from "../page/TypeProductPage/TypeProductPage.jsx";
import SignInPage from "../page/SignInPage/SignInPage.jsx"
import SignUpPage from "../page/SignUpPage/SignUpPage.jsx"
import ProductDetails from "../page/ProductDetailsPage/ProductDetailsPage.jsx"
import ProfilePage from "../page/Profile/ProfilePage.jsx";
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
        path: '*',
        page: NotFoundPage
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
]