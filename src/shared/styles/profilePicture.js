const img = {
    width: "30px",
    height: "30px",
    objectFit: "cover",
    borderRadius: "5px",
    marginRight: "10px",
}

export default {
    online: {
        ...img,
        border: "2px solid #00b800",
    },
    offline: {
        ...img,
        border: "2px solid #b20000",
    },
}
