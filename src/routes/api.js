const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const ReviewController = require('../controllers/ReviewController')
const FeaturesController = require('../controllers/FeaturesController')
const CartController = require('../controllers/CartController')
const WishController = require('../controllers/WishController')
const InvoiceController = require('../controllers/InvoiceController')
const BlogController = require('../controllers/BlogController')
const ContactController = require('../controllers/ContactController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')

// Category API
router.post('/CreateCategory', ProductController.CreateCategory)
router.post('/UpdateCategory/:categoryId', ProductController.UpdateCategory)
router.get('/ReadCategory/:categoryId', ProductController.ReadCategory)
router.get('/RemoveCategory/:categoryId', ProductController.RemoveCategory)
router.get('/CategoryList', ProductController.CategoryList)

// Brand API
router.post('/CreateBrand', ProductController.CreateBrand)
router.post('/UpdateBrand/:brandId', ProductController.UpdateBrand)
router.get('/ReadBrand/:brandId', ProductController.ReadBrand)
router.get('/RemoveBrand/:brandId', ProductController.RemoveBrand)
router.get('/BrandList', ProductController.BrandList)

//Product API
router.post('/SaveProduct', ProductController.SaveProduct)
router.post('/SaveProductDetails', ProductController.SaveProductDetails)
router.post('/UpdateProduct/:productID', ProductController.UpdateProduct)
router.post('/UpdateProductDetails/:productID', ProductController.UpdateProductDetails)
router.get('/ProductDetails/:productID', ProductController.ProductDetails)
router.get('/DeleteProduct/:productID', ProductController.DeleteProduct)
router.get('/DeleteProductDetails/:productID', ProductController.DeleteProductDetails)
router.get('/ProductList', ProductController.ProductList)
router.get('/ProductListByCategory/:categoryID', ProductController.ProductListByCategory)
router.get('/ProductListByBrand/:brandID', ProductController.ProductListByBrand)
router.get('/ProductListByRemark/:remark', ProductController.ProductListByRemark)
router.get('/ProductListByKeyword/:keyword', ProductController.ProductListByKeyword)
router.post('/ProductListByFilter', ProductController.ProductListByFilter)
router.post('/SaveProductSlider', ProductController.SaveProductSlider)
router.post('/UpdateProductSlider/:sliderID', ProductController.UpdateProductSlider)
router.get('/ProductSliderDetails/:sliderID', ProductController.ProductSliderDetails)
router.get('/RemoveProductSlider/:sliderID', ProductController.RemoveProductSlider)
router.get('/ProductSliderList', ProductController.ProductSliderList)
router.post('/SaveAds', ProductController.SaveAds)
router.post('/UpdateAds/:adsID', ProductController.UpdateAds)
router.get('/AdsDetails/:adsID', ProductController.AdsDetails)
router.get('/RemoveAds/:adsID', ProductController.RemoveAds)
router.get('/AdsList', ProductController.AdsList)
router.get('/ActiveAdsList', ProductController.ActiveAdsList)

//Features API
router.post('/SaveFeatures', FeaturesController.SaveFeatures)
router.post('/UpdateFeatures/:featureID', FeaturesController.UpdateFeatures)
router.get('/FeaturesDetails/:featureID', FeaturesController.FeaturesDetails)
router.get('/DeleteFeatures/:featureID', FeaturesController.DeleteFeatures)
router.get('/FeaturesList', FeaturesController.FeaturesList)


//Review API
router.post('/SaveReview', AuthVerifyMiddleware, ReviewController.SaveReview)
router.post('/UpdateReview/:reviewID', AuthVerifyMiddleware, ReviewController.UpdateReview)
router.get('/ReadReview/:reviewID', AuthVerifyMiddleware, ReviewController.ReadReview)
router.get('/RemoveReview/:reviewID', AuthVerifyMiddleware, ReviewController.RemoveReview)
router.get('/ReviewList/:productID', ReviewController.ReviewList)

//User API
router.post('/SaveUser', UserController.SaveUser)
router.post('/LoginUser', UserController.LoginUser)
router.get('/SendOTP/:email', UserController.SendOTP)
router.get('/VerifyOTP/:email/:otp', UserController.VerifyOTP)
router.get('/ForgetPass/:email/:otp/:password', UserController.ForgetPass)
router.get('/LogoutUser', AuthVerifyMiddleware, UserController.LogoutUser)
router.get('/ReadUser', AuthVerifyMiddleware, UserController.ReadUser)
router.post('/UpdateUser', AuthVerifyMiddleware, UserController.UpdateUser)
router.get('/RemoveUser', AuthVerifyMiddleware, UserController.RemoveUser)
router.post('/SaveProfile', AuthVerifyMiddleware, UserController.SaveProfile)
router.get('/ReadProfile', AuthVerifyMiddleware, UserController.ReadProfile)
router.get('/RemoveProfile', AuthVerifyMiddleware, UserController.RemoveProfile)

//Cart API
router.post('/SaveCart', AuthVerifyMiddleware, CartController.SaveCart)
router.post('/UpdateCart/:cartID', AuthVerifyMiddleware, CartController.UpdateCart)
router.get('/CartDetails/:cartID', AuthVerifyMiddleware, CartController.CartDetails)
router.get('/RemoveCart/:cartID', AuthVerifyMiddleware, CartController.RemoveCart)
router.get('/CartList', AuthVerifyMiddleware, CartController.CartList)

//Wish API
router.get('/SaveWish/:productID', AuthVerifyMiddleware, WishController.SaveWish)
router.get('/UpdateWish/:wishID/:productID', AuthVerifyMiddleware, WishController.UpdateWish)
router.get('/WishDetails/:productID', AuthVerifyMiddleware, WishController.WishDetails)
router.get('/RemoveWish/:productID', AuthVerifyMiddleware, WishController.RemoveWish)
router.get('/WishList', AuthVerifyMiddleware, WishController.WishList)

//Invoice API
router.post('/SaveInvoiceSetting', InvoiceController.SaveInvoiceSetting)
router.post('/UpdateInvoiceSetting/:settingID', InvoiceController.UpdateInvoiceSetting)
router.get('/ReadInvoiceSetting/:settingID', InvoiceController.ReadInvoiceSetting)
router.get('/RemoveInvoiceSetting/:settingID', InvoiceController.RemoveInvoiceSetting)
router.post('/CreateInvoice', AuthVerifyMiddleware, InvoiceController.CreateInvoice)

router.post('/PaymentSuccess/:trxID', InvoiceController.PaymentSuccess)
router.post('/PaymentFail/:trxID', InvoiceController.PaymentFail)
router.post('/PaymentCancel/:trxID', InvoiceController.PaymentCancel)
router.post('/PaymentIPN/:trxID', InvoiceController.PaymentIPN)

router.get('/InvoiceList', AuthVerifyMiddleware, InvoiceController.InvoiceList)
router.get('/InvoiceDetails/:invoiceID', AuthVerifyMiddleware, InvoiceController.InvoiceDetails)
router.get('/UpdateDeliveryStatus/:trxID/:status', InvoiceController.UpdateDeliveryStatus)

//Blog API
router.post('/SaveBlog', BlogController.SaveBlog)
router.post('/UpdateBlog/:blogID', BlogController.UpdateBlog)
router.get('/BlogDetails/:blogID', BlogController.BlogDetails)
router.get('/RemoveBlog/:blogID', BlogController.RemoveBlog)
router.get('/BlogList', BlogController.BlogList)
router.get('/ActiveBlogList', BlogController.ActiveBlogList)
router.get('/BlogListByCategory/:categoryID', BlogController.BlogListByCategory)

//Contact API
router.post('/createContact', ContactController.createContact)
router.post('/updateContact/:contactID', ContactController.updateContact)
router.get('/readContact/:contactID', ContactController.readContact)
router.get('/removeContact/:contactID', ContactController.removeContact)
router.get('/ContactList', ContactController.ContactList)



module.exports = router;













