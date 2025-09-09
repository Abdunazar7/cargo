const { createViewPage } = require("../helpers/create.view.page")

const router = require("express").Router()

router.get("/", (req, res)=>{
    res.render(createViewPage("index")),
    {
        title: "Main page",
        isOper: true, // Menu active qilish
    }
})
router.get("/orders", (req, res)=>{
    res.render(createViewPage("orders")),
    {
        title: "Order page",
        isOper: true, // Menu active qilish
    }
})
router.get("/oper", (req, res)=>{
    res.render(createViewPage("oper")),
    {
        title: "Operations page",
        isOper: true, // Menu active qilish
    }
})
router.get("/admins", (req, res)=>{
    res.render(createViewPage("admins")),
    {
        title: "Admin page",
        isOper: true, // Menu active qilish
    }
})
router.get("/login", (req, res)=>{
    res.render(createViewPage("login")),
    {
        title: "Login page",
        isOper: true, // Menu active qilish
    }
})

module.exports = router;