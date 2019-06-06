var fs = require("fs");
var wenjianjia = []
const path = require("path")
//这个函数的callback中含有两个参数，一个是err
//另一个是存放所有文件夹名字的array。
exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        if (err) {
            callback("没有找到uploads文件", null);
        }
        var allAlbums = [];
        (function iterator(i) {
            if (i == files.length) {
                //遍历结束
                callback(null, allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err, stats) {
                if (err) {
                    callback("找不到文件" + files[i], null);
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });

        })(0);
    });
}

//通过文件名，得到所有图片
exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir("./uploads/" + albumName, function (err, files) {
        if (err) {
            callback("没有找到uploads文件", null);
            return;
        }
        var allImages = [];
        (function iterator(i) {
            if (i == files.length) {
                //遍历结束
                callback(null, allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function (err, stats) {
                if (err) {
                    callback("找不到文件" + files[i], null);
                    return;
                }
                if (stats.isFile()) {
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}

exports.createdir = (data, callback) => {
    fs.readdir("./uploads", (err, files) => {
        if (err) callback(err)
        const dir = files.find((value) => {
            return value == data.dirname
        })
        if (dir === undefined) {
            fs.mkdir("./uploads/" + data.dirname, (err) => {
                if (err) callback(err)
                callback(null, null)
            })
        } else {
            callback(null, { "code": 0 })
        }
    })
}



exports.removedir = (data, callback) => {
    let dir = data.dirname
    let pathName = path.join(__dirname, `../uploads/${dir}`)
    fs.readdir(pathName, (err, files) => {
        console.log(files.length)
        if (err) { callback(err); }
        if (files.length == 0) {
            fs.rmdir(pathName, (err) => {
                if (err) callback(err);
                callback(null)
            })
        } else {
            var length = files.length
            for (let i = 0; i < length; i++) {
                fs.unlink(path.join(pathName, files[i]), (err) => {
                    if (err) { callback(err) };
                    if (i == files.length - 1) {
                        fs.rmdir(pathName, (err) => {
                            if (err) { callback(err) };
                            callback(null)
                        })
                    }
                })
            }

        }

    })
}



exports.renamedir = (data, callback) => {
    let oldpath = path.join(__dirname, `../uploads/${data.oldname}`)
    let newpath = path.join(__dirname, `../uploads/${data.newname}`)
    fs.readdir("./uploads", (err, files) => {

        if (err) callback(err)
        const dir = files.find((value) => {
            return value == data.newname
        })

        if (dir === undefined) {
            fs.rename(oldpath, newpath, (err) => {
                if (err) callback(err)
                callback(null, null)
            })
        } else {
            callback(null, { "code": 0 })
        }
    })
}

exports.removefile = (data, callback) => {
    let filename = data.filename
    let filedir = data.filedir
    fs.unlink(path.join(__dirname, '../uploads/' + filedir + '/' + filename), (err) => {
        if (err) callback(err)
        callback(null)
    })
}