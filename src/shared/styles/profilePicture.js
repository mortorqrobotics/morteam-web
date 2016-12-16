const img = {
    objectFit: "cover",
    borderRadius: "5px",
}

export default {
    default: {
        ...img,
    },
    online: {
        ...img,
        border: "2px solid #00b800",
    },
    offline: {
        ...img,
        border: "2px solid #b20000",
    },
}
