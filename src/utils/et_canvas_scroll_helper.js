//  export const Rect = /** @class */ (function () {
//     function Rect(left, top, width, height) {
//         this.left = left;
//         this.top = top;
//         this.width = width;
//         this.height = height;
//     }
//     Rect.prototype.moveTo = function (x, y) {
//         this.left = x;
//         this.top = y;
//         return this;
//     };
//     Rect.prototype.clone = function () {
//         return new Rect(this.left, this.top, this.width, this.height);
//     };
//     /**
//      * 求该rect和 rect 的并集，会更新 this
//      */
//     Rect.prototype.unionBy = function (rect) {
//         var thisRight = this.left + this.width, thisBottom = this.top + this.height, rectRight = rect.left + rect.width, rectBottom = rect.top + rect.height;
//         var left = this.left < rect.left ? this.left : rect.left, top = this.top < rect.top ? this.top : rect.top, right = thisRight > rectRight ? thisRight : rectRight, bottom = thisBottom > rectBottom ? thisBottom : rectBottom;
//         this.left = left;
//         this.top = top;
//         this.width = right - left;
//         this.height = bottom - top;
//         return this;
//     };
//     /**
//      * 对该rect的四个方向扩大 padding 的长度，会更新 this
//      */
//     Rect.prototype.growBy = function (padding) {
//         this.left = this.left - padding;
//         this.top = this.top - padding;
//         this.width = this.width + padding + padding;
//         this.height = this.height + padding + padding;
//         return this;
//     };
//     /**
//      * 求 this 和 rect 是否相交
//      */
//     Rect.prototype.isIntersect = function (rect) {
//         return !(this.top > rect.top + rect.height || this.top + this.height < rect.top ||
//             this.left > rect.left + rect.width || this.left + this.width < rect.left);
//     };
//     /**
//      * 求 this 是否包含 rect
//      */
//     Rect.prototype.isContains = function (rect) {
//         return (this.left <= rect.left &&
//             this.top <= rect.top &&
//             this.left + this.width >= rect.left + rect.width &&
//             this.top + this.height >= rect.top + rect.height);
//     };
//     /**
//      * 是否相等
//      * @param rect
//      */
//     Rect.prototype.isEqual = function (rect) {
//         return rect && rect.left === this.left && rect.top === this.top && rect.width === this.width && rect.height === this.height;
//     };
//     /**
//      * 求 this 是否包含 point
//      */
//     Rect.prototype.isContainsPoint = function (x, y) {
//         return (this.left <= x &&
//             this.top <= y &&
//             this.left + this.width >= x &&
//             this.top + this.height >= y);
//     };
//     /**
//      * 求 this 是否在 rect 中
//      */
//     Rect.prototype.isWithin = function (rect) {
//         return (rect.left <= this.left &&
//             rect.top <= this.top &&
//             this.left + this.width <= rect.left + rect.width &&
//             this.top + this.height <= rect.top + rect.height);
//     };
//     return Rect;
// }());



// export function ScrollSubRect(rcOld, rcCur) {
//     if (rcCur.width <= 0 || rcCur.height <= 0) {
//         return null;
//     }

//     let clips = [];

//     if (rcOld.width <= 0 || rcOld.height <= 0) {
//         clips.push(rcCur);
//         return {clips};
//     }

//     // cur
//     //+-----+-----+-----+
//     //|        1        |
//     //+-----+-----+-----+
//     //|   2 | old |  3  |
//     //+-----+-----+-----+
//     //|        4        |
//     //+-----+-----+-----+

//     const cx1 = rcCur.left;
//     const cy1 = rcCur.top;
//     const cx2 = cx1 + rcCur.width;
//     const cy2 = cy1 + rcCur.height;

//     const ox1 = rcOld.left;
//     const oy1 = rcOld.top;
//     const ox2 = ox1 + rcOld.width;
//     const oy2 = oy1 + rcOld.height;

//     // 1
//     if (oy1 > cy1 && oy1 <= cy2) {
//         const x = cx1;
//         const y = cy1;
//         const w = rcCur.width;
//         const h = oy1 - cy1;
//         clips.push(new Rect(x, y, w, h));
//     }

//     // 4
//     if (cy2 > oy2 && cy1 <= oy2) {
//         const x = cx1;
//         const y = oy2;
//         const w = rcCur.width;
//         const h = cy2 - oy2;
//         clips.push(new Rect(x, y, w, h));
//     }

//     // 2
//     if (ox1 > cx1 && ox1 <= cx2) {
//         const x = cx1;
//         const y = oy1;
//         const w = ox1 - cx1;
//         const h = rcOld.height;
//         clips.push(new Rect(x, y, w, h));
//     }

//     // 3
//     if (cx2 > ox2 && cx1 <= ox2) {
//         const x = ox2;
//         const y = oy1;
//         const w = cx2 - ox2;
//         const h = rcOld.height;
//         clips.push(new Rect(x, y, w, h));
//     }

//     // old
//     let rcKeep = null;
//     const x1 = Math.max(cx1, ox1);
//     const y1 = Math.max(cy1, oy1);
//     const x2 = Math.min(cx2, ox2);
//     const y2 = Math.min(cy2, oy2);
//     const w = x2 - x1;
//     const h = y2 - y1;
//     if (w > 0 && h > 0) {
//         rcKeep = {
//             rcSrc: new Rect(x1 - ox1, y1 - oy1, w, h),    //来源区域
//             rcDest: new Rect(x1 - cx1, y1 - cy1, w, h),   //目的地
//         };
//     }

//     // 大范围跳跃，old cur无相交的情况
//     if (!rcKeep && clips.length === 0) {
//         clips.push(rcCur);
//     }

//     return {clips, rcKeep: rcKeep};
// }

// const clipResult = ScrollSubRect(new Rect(0, 0, 300, 300), new Rect(150, 150, 300, 300));
// console.log(clipResult);




export const Rect = /** @class */ (function () {
    function Rect(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.moveTo = function (x, y) {
        this.left = x;
        this.top = y;
        return this;
    };
    Rect.prototype.clone = function () {
        return new Rect(this.left, this.top, this.width, this.height);
    };
    /**
     * 求该rect和 rect 的并集，会更新 this
     */
    Rect.prototype.unionBy = function (rect) {
        var thisRight = this.left + this.width, thisBottom = this.top + this.height, rectRight = rect.left + rect.width, rectBottom = rect.top + rect.height;
        var left = this.left < rect.left ? this.left : rect.left, top = this.top < rect.top ? this.top : rect.top, right = thisRight > rectRight ? thisRight : rectRight, bottom = thisBottom > rectBottom ? thisBottom : rectBottom;
        this.left = left;
        this.top = top;
        this.width = right - left;
        this.height = bottom - top;
        return this;
    };
    /**
     * 对该rect的四个方向扩大 padding 的长度，会更新 this
     */
    Rect.prototype.growBy = function (padding) {
        this.left = this.left - padding;
        this.top = this.top - padding;
        this.width = this.width + padding + padding;
        this.height = this.height + padding + padding;
        return this;
    };
    /**
     * 求 this 和 rect 是否相交
     */
    Rect.prototype.isIntersect = function (rect) {
        return !(this.top > rect.top + rect.height || this.top + this.height < rect.top ||
            this.left > rect.left + rect.width || this.left + this.width < rect.left);
    };
    /**
     * 求 this 是否包含 rect
     */
    Rect.prototype.isContains = function (rect) {
        return (this.left <= rect.left &&
            this.top <= rect.top &&
            this.left + this.width >= rect.left + rect.width &&
            this.top + this.height >= rect.top + rect.height);
    };
    /**
     * 是否相等
     * @param rect
     */
    Rect.prototype.isEqual = function (rect) {
        return rect && rect.left === this.left && rect.top === this.top && rect.width === this.width && rect.height === this.height;
    };
    /**
     * 求 this 是否包含 point
     */
    Rect.prototype.isContainsPoint = function (x, y) {
        return (this.left <= x &&
            this.top <= y &&
            this.left + this.width >= x &&
            this.top + this.height >= y);
    };
    /**
     * 求 this 是否在 rect 中
     */
    Rect.prototype.isWithin = function (rect) {
        return (rect.left <= this.left &&
            rect.top <= this.top &&
            this.left + this.width <= rect.left + rect.width &&
            this.top + this.height <= rect.top + rect.height);
    };
    return Rect;
}());

function _newRect(x, y, w, h, offset) {
    if (offset === void 0) { offset = 0; }
    return new Rect(x, y, w, h);
}


export function ScrollSubRect(rcOld, rcCur) {
    if (rcCur.width <= 0 || rcCur.height <= 0) {
        return null;
    }
    var clips = [];
    if (rcOld.width <= 0 || rcOld.height <= 0) {
        clips.push(rcCur);
        return { clips: clips };
    }
    // 浏览器非整数比例时（如：系统200%，浏览器110%），贴图边缘无法完美对齐，方法1：将重绘区域扩大一像素覆盖次像素区域
    var offset = 0;
    // cur
    //+-----+-----+-----+
    //|        1        |
    //+-----+-----+-----+
    //|   2 | old |  3  |
    //+-----+-----+-----+
    //|        4        |
    //+-----+-----+-----+
    var cx1 = rcCur.left;
    var cy1 = rcCur.top;
    var cx2 = cx1 + rcCur.width;
    var cy2 = cy1 + rcCur.height;
    var ox1 = rcOld.left;
    var oy1 = rcOld.top;
    var ox2 = ox1 + rcOld.width;
    var oy2 = oy1 + rcOld.height;
    // 1
    if (oy1 > cy1 && oy1 <= cy2) {
        var x = cx1;
        var y = cy1;
        var w = rcCur.width;
        var h = oy1 - cy1 + offset;
        clips.push(_newRect(x, y, w, h, offset));
    }
    // 4
    if (cy2 > oy2 && cy1 <= oy2) {
        var x = cx1;
        var y = oy2 - offset;
        var w = rcCur.width;
        var h = cy2 - oy2 + offset;
        clips.push(_newRect(x, y, w, h, offset));
    }
    // old
    var rcKeep = null;
    var x1 = Math.max(cx1, ox1);
    var y1 = Math.max(cy1, oy1);
    var x2 = Math.min(cx2, ox2);
    var y2 = Math.min(cy2, oy2);
    var kw = x2 - x1;
    var kh = y2 - y1;
    if (kw > 0 && kh > 0) {
        rcKeep = {
            rcSrc: _newRect(x1 - ox1, y1 - oy1, kw, kh, 0),
            rcDest: _newRect(x1 - cx1, y1 - cy1, kw, kh, 0)
        };
    }
    // 2
    if (kh > 0 && ox1 > cx1 && ox1 <= cx2) {
        var x = cx1;
        var y = y1;
        var w = ox1 - cx1 + offset;
        var h = kh;
        clips.push(_newRect(x, y, w, h, offset));
    }
    // 3
    if (kh > 0 && cx2 > ox2 && cx1 <= ox2) {
        var x = ox2 - offset;
        var y = y1;
        var w = cx2 - ox2 + offset;
        var h = kh;
        clips.push(_newRect(x, y, w, h, offset));
    }
    // 大范围跳跃，old cur无相交的情况
    if (!rcKeep && clips.length === 0) {
        clips.push(rcCur);
    }
    return { clips: clips, rcKeep: rcKeep };
}



/*
export function ScrollSubRect(rcOld, rcCur) {
    if (rcCur.width <= 0 || rcCur.height <= 0) {
        return null;
    }
    var clips = [];
    if (rcOld.width <= 0 || rcOld.height <= 0) {
        clips.push(rcCur);
        return { clips: clips };
    }
    // cur
    //+-----+-----+-----+
    //|        1        |
    //+-----+-----+-----+
    //|   2 | old |  3  |
    //+-----+-----+-----+
    //|        4        |
    //+-----+-----+-----+
    var cx1 = rcCur.left;
    var cy1 = rcCur.top;
    var cx2 = cx1 + rcCur.width;
    var cy2 = cy1 + rcCur.height;
    var ox1 = rcOld.left;
    var oy1 = rcOld.top;
    var ox2 = ox1 + rcOld.width;
    var oy2 = oy1 + rcOld.height;
    // 1
    if (oy1 > cy1 && oy1 <= cy2) {
        var x = cx1;
        var y = cy1;
        var w_1 = rcCur.width;
        var h_1 = oy1 - cy1;
        clips.push(new Rect(x, y, w_1, h_1));
    }
    // 4
    if (cy2 > oy2 && cy1 <= oy2) {
        var x = cx1;
        var y = oy2;
        var w_2 = rcCur.width;
        var h_2 = cy2 - oy2;
        clips.push(new Rect(x, y, w_2, h_2));
    }
    // // 2
    // if (ox1 > cx1 && ox1 <= cx2) {
    //     var x = cx1;
    //     var y = Math.max(oy1,cy1);
    //     var w_3 = ox1 - cx1;
    //     var h_3 = rcOld.height;
    //     clips.push(new Rect(x, y, w_3, h_3));
    // }
    // // 3
    // if (cx2 > ox2 && cx1 <= ox2) {
    //     var x = ox2;
    //     var y = Math.max(oy1,cy1);
    //     var w_4 = cx2 - ox2;
    //     var h_4 = rcOld.height - y;
    //     clips.push(new Rect(x, y, w_4, h_4));
    // }

    // 2
    if (ox1 > cx1 && ox1 <= cx2) {
        const y = Math.max(oy1, cy1);
        const h = Math.min(oy2, cy2) - y;
        if (h > 0) {
            const x = cx1;
            const w = ox1 - cx1;
            clips.push(new Rect(x, y, w, h));
        }
    }

    // 3
    if (cx2 > ox2 && cx1 <= ox2) {
        const y = Math.max(oy1, cy1);
        const h = Math.min(oy2, cy2) - y;
        if (h > 0) {
            const x = ox2;
            const w = cx2 - ox2;
            clips.push(new Rect(x, y, w, h));
        }
    }
    // old
    var rcKeep = null;
    var x1 = Math.max(cx1, ox1);
    var y1 = Math.max(cy1, oy1);
    var x2 = Math.min(cx2, ox2);
    var y2 = Math.min(cy2, oy2);
    var w = x2 - x1;
    var h = y2 - y1;
    if (w > 0 && h > 0) {
        rcKeep = {
            rcSrc: new Rect(x1 - ox1, y1 - oy1, w, h),
            rcDest: new Rect(x1 - cx1, y1 - cy1, w, h)
        };
    }
    // 大范围跳跃，old cur无相交的情况
    if (!rcKeep && clips.length === 0) {
        clips.push(rcCur);
    }
    return { clips: clips, rcKeep: rcKeep };
}


const clipResult = ScrollSubRect(new Rect(100, 100, 200, 200), new Rect(0, 0, 200, 200));
console.log(clipResult);

*/