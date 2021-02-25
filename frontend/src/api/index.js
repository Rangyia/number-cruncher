import axios from "axios";
require("dotenv").config();
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const SERVER_URI = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://ksu-number-cruncher.herokuapp.com"
    } else {
        return "http://localhost:8000"
    }
};

export default axios.create({
    baseURL: "http://localhost:8000",
});