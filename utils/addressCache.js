class AddressCache {

    getAddressFromCache() {
        return wx.getStorageSync(app.globalData.addressKey);
    }
}

export {
    AddressCache
}