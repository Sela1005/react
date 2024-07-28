import OderPage from "../page/OrderPage/OrderPage.jsx";
import ProductPage from "../ProductPage/ProductPage";
import Home from "../page/HomePage/Home";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import TypeProductPage from "../page/TypeProductPage/TypeProductPage";
import SignInPage from "../page/SignInPage/SignInPage.jsx"
import SignUpPage from "../page/SignUpPage/SignUpPage.jsx"
import ProductDetails from "../page/ProductDetailsPage/ProductDetailsPage"
import ProfilePage from "../page/Profile/ProfilePage.jsx";
import AdminPage from "../page/AdminPage/AdminPage.jsx";
import PaymentPage from "../page/PaymentPage/PaymentPage.jsx";
import OrderSuccess from "../page/OrderSuccess/OrderSucces.jsx";
import MyOderPage from "../page/MyOrderPage/MyOrderPage.jsx";
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
        path: '/my-order',
        page: MyOderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
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
        path: '/product-details/:id',
        page: ProductDetails,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]