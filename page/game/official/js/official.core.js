var officialCore = (function () {
    var export_clearAll;
    gameManager.initGame();
    var currentTemplateConfig, betContentList = [], confirmBetContent, reBetRecordAction, openNumberLen;
    var inputBetModel = 0, inputMulTiple = 1, inputRebate = 0, onInputChange, isPostBet = false;
    var officialUserRebate = 5, userInfoIsLoaded = false;
    var allowCancel = false;

    function isAllowCancel() {
        $.getJSON("/data/json/web_system_config.json?t=" + new Date().getTime(),
            function (data) {
            var hyCancel = data.hy_is_cancel;
            if (hyCancel != null && hyCancel == 1) {
              allowCancel = true;
            } else {
              allowCancel = false;
            }
        })
      }

    isAllowCancel();
    var util = function () {
        var factorial = function (t) {
            for (var e = 1; t > 0;)
                e *= t,
                    t--;
            return e
        }, numberFixed = function (val, len) {
            var strValue = val + ''
            var start = strValue.indexOf('.')
            if (start > 0 && strValue.length > start + len + 1) {
                var endValue = parseInt(strValue.substr(start + len + 1, 1))
                if (endValue >= 5) {
                    var temp = Math.pow(10, len + 1)
                    strValue = (val + 1 / temp).toFixed(len);
                } else {
                    strValue = strValue.substr(0, start + len + 1)
                }
            }
            return strValue
        };
        return {
            floor: function (val, len) {
                var _pw = Math.pow(10, len)
                return parseFloat(numberFixed(Math.floor(val * _pw) / _pw, len))
            },
            random: function (range) {
                return $.isArray(range) ? Math.floor(Math.random() * (range[1] + 1 - range[0]) + range[0]) : Math.floor(10 * Math.random())
            },
            arrayGetDistinctValues: function (ary) {
                var dict = {}
                var newAry = []
                for (var i = 0; i < ary.length; i++) {
                    if (!dict['_' + ary[i]]) {
                        dict['_' + ary[i]] = 1;
                        newAry.push(ary[i]);
                    }
                }
                return newAry;
            },
            C: function (t, e) {
                return 0 === t || 0 === e || e > t ? 0 : factorial(t) / (factorial(e) * factorial(t - e))
            },
            CPrint: function (ary, len) {
                // "var arr=arguments[0],len=arguments[1],result=[];for(var _0=0;_0<len+1-2;_0++){for(var _1=_0+1;_1<len+1-1;_1++){result.push([arr[_0],arr[_1]])}}return result;"
                var aryLen = ary.length;
                var script = "var arr=arguments[0],len=arguments[1],result=[];";
                var pushDataScript = "";
                var forEnd = "";
                for (var index = 0; index < len; index++) {
                    pushDataScript += "arr[_" + index + "],";
                    script += 0 === index ? "for(var _" + index + "=0;_" + index + "<len+1-" + (len - index) + ";_" + index + "++){" : "for(var _" + index + "=_" + (index - 1) + "+1;_" + index + "<len+1-" + (len - index) + ";_" + index + "++){";
                    forEnd += "}";
                }
                script += "result.push([" + pushDataScript.slice(0, -1) + "])" + forEnd + "return result;";
                return new Function(script)(ary, aryLen)
            },
            isArray: function (o) {
                return Object.prototype.toString.call(o) == '[object Array]';
            },
            arrayIndexOf: function (ary, num) {
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] === num) {
                        return i;
                    }
                }
                return -1;
            },
            toFixed: function (val, len) {
                return val && typeof val === 'number' ? parseFloat(numberFixed(val, len)) : val;
            },
            moneyFormat: function (val) {
                return this.toFixed(val, 4)
            }
        }

    }();
    var algorithm = function () {
        var factorial = function (t) {
            for (var e = 1; t > 0;)
                e *= t,
                    t--;
            return e
        }, C = function (t, e) {
            return 0 === t || 0 === e || e > t ? 0 : factorial(t) / (factorial(e) * factorial(t - e))
        }, A = function (t, e) {
            return factorial(t) / factorial(t - e)
        }, CPrint = function (ary, len) {
            // "var arr=arguments[0],len=arguments[1],result=[];for(var _0=0;_0<len+1-2;_0++){for(var _1=_0+1;_1<len+1-1;_1++){result.push([arr[_0],arr[_1]])}}return result;"
            var aryLen = ary.length;
            var script = "var arr=arguments[0],len=arguments[1],result=[];";
            var pushDataScript = "";
            var forEnd = "";
            for (var index = 0; index < len; index++) {
                pushDataScript += "arr[_" + index + "],";
                script += 0 === index ? "for(var _" + index + "=0;_" + index + "<len+1-" + (len - index) + ";_" + index + "++){" : "for(var _" + index + "=_" + (index - 1) + "+1;_" + index + "<len+1-" + (len - index) + ";_" + index + "++){";
                forEnd += "}";
            }
            script += "result.push([" + pushDataScript.slice(0, -1) + "])" + forEnd + "return result;";
            return new Function(script)(ary, aryLen)
        }, toFixed = function (n, m) {
            m = m || 9;
            return n.toFixed(m);
        }, arrayIndexOf = function (ary, num) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] === num) {
                    return i;
                }
            }
            return -1;
        }, numsToComb = function (row1, min, row2, min2) {
            if (2 === arguments.length)
                return row1.length < min ? 0 : C(row1.length, min);
            var repeatNum = [];
            for (var i = 0; i < row1.length; i++) {
                if (arrayIndexOf(row2, row1[i]) > -1) {
                    repeatNum.push(row1[i]);
                }
            }
            var repeatNumLen = repeatNum.length
                , row1Len = row1.length
                , noRepeatNumLen = row1Len - repeatNumLen
                , row2Len = row2.length;
            switch (min) {
                case 1:
                    return C(noRepeatNumLen, 1) * C(row2Len, min2) + C(repeatNumLen, 1) * C(row2Len - 1, min2);
                case 2:
                    return C(noRepeatNumLen, 2) * C(row2Len, min2) + C(noRepeatNumLen, 1) * C(repeatNumLen, 1) * C(row2Len - 1, min2) + C(repeatNumLen, 2) * C(row2Len - 2, min2)
            }
            return 0
        }, combToNums = function (num, numLen, minValue, maxValue, type) {
            num = parseInt(num);
            var i = "C" === type
                , betCount = 0
                , s = {};

            function caculate(index, len, beforeAry) {
                for (var testNum = minValue; testNum <= maxValue; testNum++)
                    if (len - 1 > 0) {
                        caculate(testNum + index, len - 1, beforeAry.concat(testNum));
                    } else if (index + testNum === num) {
                        if (i) {
                            if ("" === beforeAry.join("").replace(new RegExp(testNum + "", "g"), ""))
                                return;
                            var d = beforeAry.concat(testNum).sort().join("");
                            1 !== s[d] && (++betCount, s[d] = 1)
                        } else {
                            ++betCount;
                        }
                    }
            };
            caculate(0, numLen, []);
            return betCount
        };
        var allAlgorithm = {
            danshi1: function (content, min) {
                if (!content) {
                    return {
                        count: 0,
                        content: ''
                    }
                }
                var content = content.replace(/[^\d]+/g, "");
                var ary = [], repeatAry = [], nums;
                if (openNumberLen == 1) {
                    nums = content.split("")
                } else { //  两个号码的分割
                    nums = []
                    var range = currentTemplateConfig.sub[1];
                    var chars = content.split("");
                    for (var i = 0; i + 1 < chars.length; i += openNumberLen) {
                        var numStr = chars[i] + chars[i + 1];
                        var numInt = parseInt(numStr);
                        if (numInt >= range[0] && numInt <= range[1]) {
                            nums.push(numStr);
                        }
                    }
                }
                var canRepeat = currentTemplateConfig.format[0].indexOf('m') == -1;
                for (var i = 0; i + min - 1 < nums.length; i += min) {
                    // 检查一注中是否有重复号码
                    if (canRepeat || util.arrayGetDistinctValues(nums.slice(i, i + min)).length === min) {
                        var bet = nums.slice(i, i + min).join(',');
                        // 检查是否有相同的下注数据
                        if (arrayIndexOf(ary, bet) === -1) {
                            ary.push(bet);
                        } else {
                            repeatAry.push(bet);
                        }
                    }
                }
                return {
                    count: ary.length,
                    content: ary.join("|")
                }
            },
            danshi2: function (content, min) {
                var betInfo = this.danshi1(content.text, min);
                return {
                    count: C(content.betPos.length, min) * betInfo.count,
                    content: betInfo.content,
                    betPos: content.betPos.join(','),
                    betPosNames: content.betPosNames.join(',')
                }
            },
            R1: function (betContent, min) {
                min = min || 1;
                var betValues = 0, betPos, betPosNames, posLen;
                if (!util.isArray(betContent)) {
                    betValues = betContent.nums;
                    betPos = betContent.betPos;
                    betPosNames = betContent.betPosNames;
                    posLen = betContent.posLen
                } else {
                    betValues = betContent
                }
                if (betValues.length === 0) {
                    return {count: 0, content: ''};
                }
                var count = 1, _content = [];
                for (var i = 0; i < betValues.length; i++) {
                    if (betValues[i].length < 1) {
                        return {count: 0, content: ''};
                    }
                    count *= C(betValues[i].length, min);
                    _content.push(betValues.length > 1 ? betValues[i].join(',') : betValues[i].join('|'))
                }
                return {
                    count: !(betPos && count) ? count : util.C(betPos.length, posLen) * count,
                    content: _content.join('|'),
                    betPos: betPos ? betPos.join(',') : '',
                    betPosNames: betPos ? betPosNames.join(',') : ''
                };
            },
            R2: function (betContent) {
                var result = this.R1(betContent);
                result.count = result.count * betContent.length;
                return result;
            },
            R3: function (betContent, row1Num, row2Num) {
                var betNums;
                if (util.isArray(betContent)) {
                    betNums = betContent
                } else {
                    betNums = betContent.nums;
                }

                var rowLength = betNums.length;
                if (rowLength > 2 || rowLength < 1)
                    throw "该算法不支持该玩法，最多支持两组，该玩法有" + rowLength + "组";
                if (rowLength === 1 && !row2Num) {
                    if (util.isArray(betContent)) {
                        return {
                            count: numsToComb(betNums[0], row1Num),
                            content: betNums[0].join('|'),
                        }
                    } else {
                        return {
                            count: numsToComb(betNums[0], row1Num) * C(betContent.betPos.length, betContent.posLen),
                            content: betNums[0].join('|'),
                            betPos: betContent.betPos.join(','),
                            betPosNames: betContent.betPosNames.join(',')
                        }
                    }
                }
                if (rowLength === 2 && row2Num) {
                    if (util.isArray(betContent)) {
                        return {
                            count: numsToComb(betNums[0], row1Num, betNums[1], row2Num),
                            content: [betNums[0].join(','), betNums[1].join(',')].join("|")
                        }
                    } else {
                        return {
                            count: numsToComb(betNums[0], row1Num, betNums[1], row2Num) * C(betContent.betPos.length, betContent.posLen),
                            content: [betNums[0].join(','), betNums[1].join(',')].join("|"),
                            betPos: betContent.betPos.join(','),
                            betPosNames: betContent.betPosNames.join(',')
                        }
                    }
                }
                throw "请检查参数是否有误"
            },
            R4: function (betContent, numLen, minValue, maxValue, type) {
                var betValues, betPos, betPosNames;
                if (!util.isArray(betContent)) {
                    betValues = betContent.nums[0];
                    betPos = betContent.betPos;
                    betPosNames = betContent.betPosNames;
                } else {
                    betValues = betContent[0];
                }
                var betCount = 0;
                for (var i = 0; i < betValues.length; i++) {
                    betCount += combToNums(betValues[i], numLen, minValue, maxValue, type);
                }
                return {
                    count: !(betPos && betCount) ? betCount : betCount * util.C(betPos.length, betContent.posLen),
                    content: betValues.join('|'),
                    betPos: betPos ? betPos.join(',') : '',
                    betPosNames: betPos ? betPosNames.join(',') : ''
                }
            },
            R5: function (betContent) {
                var betValues, betPos, betPosNames, posLen;
                if (!util.isArray(betContent)) {
                    betValues = betContent.nums[0];
                    betPos = betContent.betPos;
                    betPosNames = betContent.betPosNames;
                    posLen = betContent.posLen;
                } else {
                    betValues = betContent[0]
                }
                if (!betPos) {
                    return {
                        count: 2 * C(betValues.length, 2),
                        content: betValues.join('|')
                    }
                } else {
                    return {
                        count: 2 * C(betValues.length, 2) * C(betPos.length, posLen),
                        content: betValues.join('|'),
                        betPos: betPos ? betPos.join(',') : '',
                        betPosNames: betPos ? betPosNames.join(',') : ''
                    }
                }
            },
            R6: function (betContent) {
                var count = 0, betAry = [], betPos = [], betPosNames = []
                for (var i = 0; i < betContent.length; i++) {
                    if (betContent[i].length === 0) {
                        continue;
                    }
                    count += betContent[i].length;
                    betAry.push(betContent[i].join(','))
                    betPos.push(i);
                    betPosNames.push(currentTemplateConfig.sub[0][i]);
                }
                return {
                    count: count,
                    content: betAry.join('|'),
                    betPos: betPos.join(','),
                    betPosNames: betPosNames.join(',')
                };
            },
            R7: function (betContent, zhuHeLen, rowLen) {
                rowLen = rowLen || 1;
                var _betContent = [];
                for (var i = 0; i < betContent.length; i++) {
                    if (betContent[i].length > 0) {
                        _betContent.push({pos: i, name: currentTemplateConfig.sub[0][i], nums: betContent[i]});
                    }
                }
                if (_betContent.length < 2) {
                    return {
                        count: 0,
                        content: '',
                    }
                }
                betContent = _betContent;
                var betCount = 0, showBetContent = [], betPosAry = [], showBetPosName = [],
                    zhuHeAry = CPrint(betContent, zhuHeLen);
                for (var i = 0; i < zhuHeAry.length; i++) {
                    var zhuHeBetCount = 1;
                    for (var j = 0; j < zhuHeAry[i].length; j++) {
                        zhuHeBetCount *= C(zhuHeAry[i][j].nums.length, rowLen);
                    }
                    betCount += zhuHeBetCount
                }
                for (var i = 0; i < betContent.length; i++) {
                    showBetContent.push(betContent[i].nums.join(','));
                    showBetPosName.push(betContent[i].name);
                    betPosAry.push(betContent[i].pos);
                }
                return {
                    count: betCount,
                    content: showBetContent.join("|"),
                    betPosNames: showBetPosName.join(","),
                    betPos: betPosAry.join(","),
                };
            },
            R8: function (betContent, rowLen) {
                rowLen = rowLen || 1;
                var betAry = [];
                for (var i = 0; i < betContent.length; i++) {
                    betAry = betAry.concat(betContent[i]);
                }
                return {
                    count: C(betAry.length, rowLen),
                    content: betAry.join('|')
                }
            },
            R9: function (betContent, len) {
                len = len || 1;
                var resultContent = [];
                for (var i = 0; i < betContent.length; i++) {
                    if (betContent[i].length === 0) {
                        return {
                            count: 0,
                            content: '',
                        }
                    }
                    resultContent.push(betContent[i].join(','));
                }
                // var result=[],arr=arguments[0];
                // for(var _0=0,__0=arr[0].length;_0<__0;_0++){
                //   for(var _1=0,__1=arr[1].length;_1<__1;_1++){
                //     for(var _2=0,__2=arr[2].length;_2<__2;_2++){
                //       util.arrayGetDistinctValues([arr[0][_0],arr[1][_1],arr[2][_2]]).length==3 && result.push([arr[0][_0],arr[1][_1],arr[2][_2]])
                //     }
                //    }
                // }
                // return result;"
                var javascript = 'var result=[],arr=arguments[0];util=arguments[1];';
                var forEndScript = '', aryGetScript = [];
                var rowLen = betContent.length;
                for (var i = 0; i < rowLen; i++) {
                    javascript += "for(var _" + i + "=0,__" + i + "=arr[" + i + "].length;_" + i + "<__" + i + ";_" + i + "++){";
                    aryGetScript.push("arr[" + i + "][_" + i + "]");
                    forEndScript += '}';
                }
                javascript += "util.arrayGetDistinctValues([" + aryGetScript.join(",") + "]).length==" + len * rowLen + " && result.push([" + aryGetScript.join(",") + "])" + forEndScript + "return result;";
                var makeZhuHeFun = new Function(javascript);
                var zhuHe = makeZhuHeFun(betContent, util);
                return {
                    count: zhuHe.length,
                    content: resultContent.join('|')
                }
            },
            R10: function (betContent, values, isIncludeDraw) {
                return {
                    count: betContent[0].length,
                    content: betContent[0].join(','),
                    isIncludeDraw: isIncludeDraw
                }
            },
            R11: function (betContent) {
                return {
                    count: betContent[0].length,
                    content: betContent[0].join(','),
                    isIncludeDraw: true
                }
            }
        }
        return function (config, betContent) {
            var algorithm = allAlgorithm[config.algorithm[0]];
            try {
                if (algorithm) {
                    return algorithm.apply(allAlgorithm, [betContent].concat(config.algorithm.slice(1)));
                } else if (typeof config.algorithm[0] === 'number') {
                    if (allAlgorithm[config.tpl]) {
                        return allAlgorithm[config.tpl].apply(allAlgorithm, [betContent].concat(config.algorithm));
                    } else {
                        throw  'algorithm not exist:' + config.tpl;
                    }
                }
                throw 'algorithm not exist:' + config.algorithm[0];
            } catch (error) {
                // console.log((error));
            }
        }
    }();
    var gameRender = function () {
        function setGameHtml(html) {
            $('.sumBtn_box').html(html);
        }

        function makeNumAry(start, end, needPadLeftZero) {
            var ary = []
            for (var i = start; i <= end; i++) {
                if (needPadLeftZero) {
                    if (i < 10) {
                        ary.push('0' + i);
                    } else {
                        ary.push('' + i);
                    }
                } else {
                    ary.push(i);
                }
            }
            return ary;
        }

        var tplGetBetContent, tplClearBetInfo;

        function onBetContentChange() {
            var betContent = tplGetBetContent.apply(allTemplate[currentTemplateConfig.tpl]);
            var betInfo = algorithm(currentTemplateConfig, betContent);
            // console.log(betInfo);
            if (betInfo && betInfo.count > 0) {
                confirmBetContent = makeOneBetContent(betInfo.content, betInfo.count, betInfo.betPos, betInfo.betPosNames, betInfo.isIncludeDraw)
            } else {
                confirmBetContent = null;
            }
            onConfirmBetContentChange();
        }

        function addRandomBet(contentAry, count) {
            for (var index = 0; index < contentAry.length; index++) {
                var betPos, betPosNames, needRandomPosTpls = ['hezhi2', 'renxuan1', 'danshi2'];
                if (currentTemplateConfig.algorithm[0] === 'R7'
                    || currentTemplateConfig.algorithm[0] === 'R6'
                    || util.arrayIndexOf(needRandomPosTpls, currentTemplateConfig.tpl) > -1) { // 生成随机下注位置
                    var rowLen, posValues, posNames;
                    if (util.arrayIndexOf(needRandomPosTpls, currentTemplateConfig.tpl) > -1) {
                        rowLen = currentTemplateConfig.posLen || currentTemplateConfig.algorithm[0];
                        posValues = [0, 1, 2, 3, 4];
                        posNames = ['万', '千', '百', '十', '个'];
                    } else {
                        rowLen = currentTemplateConfig.algorithm[1] || 1;
                        posValues = makeNumAry(0, currentTemplateConfig.sub[0].length - 1);
                        posNames = currentTemplateConfig.sub[0];
                    }
                    var randomPosIndexAry = []
                    for (var i = 0; i < rowLen;) {
                        var posIndex = util.random([0, posValues.length]);
                        if (typeof posValues[posIndex] === 'number' && posNames[posIndex] && util.arrayIndexOf(randomPosIndexAry, posIndex) === -1) {
                            randomPosIndexAry.push(posIndex);
                            i++;
                        }
                    }
                    randomPosIndexAry = randomPosIndexAry.sort(function (a, b) {
                        return a - b;
                    });
                    var betPosAry = [];
                    var posNamesAry = [];
                    for (var i = 0; i < randomPosIndexAry.length; i++) {
                        betPosAry.push(posValues[randomPosIndexAry[i]]);
                        posNamesAry.push(posNames[randomPosIndexAry[i]]);
                    }
                    betPos = betPosAry.join(',');
                    betPosNames = posNamesAry.join(',');
                }
                betContentList.push(makeOneBetContent(contentAry[index], count, betPos, betPosNames));
            }
            onBetContentListChange();
        }

        function getOdds(rebate, betModel) {
            var oddsAry = [], plays = playMap[curPlayCate.code];
            for (var i = 0; i < plays.length; i++) {
                var odds = plays[i].minOdds + (plays[i].maxOdds - plays[i].minOdds) / plays[i].rebate * (officialUserRebate - rebate) / 100;
                if (betModel === 1) {
                    odds = odds / 10
                } else if (betModel === 2) {
                    odds = odds / 100
                }
                oddsAry.push(util.toFixed(odds, 4));
            }
            if (curPlayCate.code === '923102101104') {
                var sOddsArry = [];
                sOddsArry.push(oddsAry[1])
                sOddsArry.push(oddsAry[0])
                sOddsArry.push(oddsAry[2])
                return sOddsArry.join(',')
            }
            return oddsAry.join(',')
        }

        function getOddWithValue(rebate, betModel) {
            var result = {}, plays = playMap[curPlayCate.code];
            for (var i = 0; i < plays.length; i++) {
                var odds = plays[i].minOdds + (plays[i].maxOdds - plays[i].minOdds) / plays[i].rebate * (officialUserRebate - rebate) / 100;
                if (betModel === 1) {
                    odds = odds / 10
                } else if (betModel === 2) {
                    odds = odds / 100
                }
                result[plays[i].value] = util.toFixed(odds, 4)
            }
            return result
        }

        function makeOneBetContent(content, count, betPos, posNames, isIncludeDraw) {
            var playCate = playMap[curPlayCate.code][0];
            var betModel = inputBetModel; // 模式:0元1角2分
            var oneBetMoney = 2;
            if (betModel == 1) {
                oneBetMoney = .2;
            } else if (betModel == 2) {
                oneBetMoney = .02;
            }
            return {
                code: playCate.code,
                cateName: playCate.name,
                money: oneBetMoney,
                betInfo: content,
                odds: getOdds(inputRebate, inputBetModel),
                totalMoney: util.moneyFormat(count * oneBetMoney * inputMulTiple),
                totalNums: util.toFixed(count, 0),
                rebate: inputRebate,
                multiple: inputMulTiple,
                betModel: betModel,
                poschoose: betPos || '',
                poschooseName: posNames,
                showContent: posNames ? content + '(' + posNames + ')' : content,
                isIncludeDraw: isIncludeDraw
            };
        }

        // 倍数、赔率、模式改变时调用
        onInputChange = function () {
            if (confirmBetContent) {
                confirmBetContent.multiple = inputMulTiple;
                confirmBetContent.betModel = inputBetModel;
                confirmBetContent.rebate = inputRebate;
                if (inputBetModel == 1) {
                    confirmBetContent.money = .2;
                } else if (inputBetModel == 2) {
                    confirmBetContent.money = .02;
                } else {
                    confirmBetContent.money = 2;
                }
                confirmBetContent.totalMoney = util.moneyFormat(confirmBetContent.totalNums * confirmBetContent.money * inputMulTiple);
                confirmBetContent.odds = getOdds(inputRebate, inputBetModel);
                onConfirmBetContentChange();
            }
            if (currentTemplateConfig) {
                var tpl = allTemplate[currentTemplateConfig.tpl];
                if (tpl.setOdds) { // 更新模板中显示的赔率
                    tpl.setOdds(getOddWithValue(inputRebate, inputBetModel));
                }
                // 更新显示赔率
                $("#amount").html(util.toFixed(inputRebate, 1) + "%");
                var allOdds = getOdds(inputRebate, inputBetModel)
                var odds = parseFloat(allOdds.split(',')[0]);
                $('.amountBindVal').html(util.toFixed(odds, 4));
            }
        };

        function onConfirmBetContentChange() {
            // console.log();("confirmBetContent", confirmBetContent)
            if (confirmBetContent) {
                var canWinOdd = parseFloat(confirmBetContent.odds.split('/')[0])
                var canWinMoney = 0;
                // console.log();("currentTemplateConfig", currentTemplateConfig)
                if (currentTemplateConfig.algorithm[0] === 'R6') {
                    canWinMoney = canWinOdd * confirmBetContent.betInfo.split('|').length * confirmBetContent.multiple - confirmBetContent.totalMoney;
                } else if ((currentTemplateConfig.algorithm[0] === 'R10' || currentTemplateConfig.algorithm[0] === 'R11') && (currentTemplateConfig.tpl === 'num3' || currentTemplateConfig.tpl === 'num3-1' || currentTemplateConfig.tpl === 'num7')) {
                    var iBetInfo = confirmBetContent.betInfo.split(',');
                    var oddsArry = [];
                    for (var i = 0; i < iBetInfo.length; i++) {
                        // console.log((currentTemplateConfig.tmpOdds[iBetInfo[i]]));
                        oddsArry.push(currentTemplateConfig.tmpOdds[iBetInfo[i]])
                    }
                    var showOdds = Math.max.apply(null, oddsArry);
                    canWinMoney = showOdds * confirmBetContent.multiple - confirmBetContent.totalMoney;
                    $('.amountBindVal').html(util.toFixed(showOdds, 4));
                } else if (confirmBetContent.code === '923104101101' || confirmBetContent.code === '923104101102' || confirmBetContent.code === '923103101102') {
                    var odds = confirmBetContent.odds.split(',');
                    var nodds = [];
                    for (var i = 0; i < odds.length; i++) {
                        nodds.push(parseFloat(odds[i]))
                    }
                    var maxOdds = Math.max.apply(null, nodds);
                    var minOdds = Math.min.apply(null, nodds);
                    var cOdds
                    if (confirmBetContent.betInfo.indexOf("中") > -1 || confirmBetContent.betInfo.indexOf("和") > -1) {
                        cOdds = maxOdds;
                    } else {
                        cOdds = minOdds;
                    }
                    canWinMoney = cOdds * confirmBetContent.multiple - confirmBetContent.totalMoney;
                    $('.amountBindVal').html(util.toFixed(cOdds, 4));
                }
                else {
                    canWinMoney = canWinOdd * confirmBetContent.multiple - confirmBetContent.totalMoney;
                }
                $('.betNum-btn .add-btn').addClass('activate');
                $('.betNum-btn .confirm-btn').addClass('activate1');
                $('.betNum-btn .total .count').html(confirmBetContent.totalNums);
                $('.betNum-btn .total .betMoney').html(confirmBetContent.totalMoney);
                $('.betNum-btn .total .canWinMoney').html(util.moneyFormat(canWinMoney));
            } else {
                $('.betNum-btn .add-btn').removeClass('activate')
                $('.betNum-btn .confirm-btn').removeClass('activate1')
                $('.betNum-btn .total .count').html(0);
                $('.betNum-btn .total .betMoney').html(0);
                $('.betNum-btn .total .canWinMoney').html(0);
            }
        }

        function onBetContentListChange() {
            var html = betContentListRender({list: betContentList});
            $('.bet-content-list table').html(html);
            var totalBetMoney = 0, totalOrderCount = betContentList.length, totalBetCount = 0;
            for (var i = 0; i < betContentList.length; i++) {
                totalBetMoney += betContentList[i].totalMoney;
                totalBetCount += betContentList[i].totalNums;
            }
            if (totalOrderCount > 0) {
                $('.betb-main .Continue-btn').addClass('active1');
            } else {
                $('.betb-main .Continue-btn').removeClass('active1');
            }
            $('.totalMoney').html(util.moneyFormat(totalBetMoney));
            $('.totalOrderCount').html(util.toFixed(totalOrderCount, 1));
            $('.totalBetCount').html(util.toFixed(totalBetCount, 1));
            $('.bet-content-list .bet-list-remove').on('click', function () {
                var index = parseInt($(this).parents('tr').attr('data-index'));
                betContentList.splice(index, 1);
                onBetContentListChange();
            });
        }

        var drawOrder = function () {
            var result = []
            if (confirmBetContent.isIncludeDraw) { // 拆分多个订单
                var allOdds = getOddWithValue(inputRebate, inputBetModel);
                var betValues = confirmBetContent.betInfo.split(',');
                var oneOrderMoney = util.moneyFormat(confirmBetContent.money * confirmBetContent.multiple)
                for (var i = 0; i < betValues.length; i++) {
                    result.push($.extend({}, confirmBetContent, {
                        betInfo: betValues[i],
                        odds: allOdds[betValues[i]],
                        totalNums: 1,
                        totalMoney: oneOrderMoney,
                        showContent: betValues[i]
                    }));
                }
            } else if (currentTemplateConfig.tpl === 'danshi1' || currentTemplateConfig.tpl === 'danshi2') {
                var _result = []
                // if (confirmBetContent.totalNums > 100) {
                //     var betInfoAry = confirmBetContent.betInfo.split('|')
                //     var oneNums = util.toFixed(confirmBetContent.totalNums / betInfoAry.length, 1)
                //     while (betInfoAry.length > 0) {
                //         var newBetInfoAry = betInfoAry.splice(0, 100);
                //         _result.push($.extend({}, confirmBetContent, {
                //             betInfo: newBetInfoAry.join('|'),
                //             showContent: newBetInfoAry.join('|'),
                //             totalNums: newBetInfoAry.length * oneNums,
                //             totalMoney: util.moneyFormat(confirmBetContent.money * confirmBetContent.multiple * newBetInfoAry.length * oneNums)
                //         }))
                //     }
                // } else {
                _result.push(confirmBetContent)
                // }
                if (currentTemplateConfig.tpl === 'danshi2') {
                    var zhuHeLen = currentTemplateConfig.algorithm[0];
                    var posShowNames = currentTemplateConfig.sub[0];
                    var betPos = confirmBetContent.poschoose.split(',');
                    var betPosZhuHeAry = util.CPrint(betPos, zhuHeLen);
                    var _newResult = []
                    $.each(betPosZhuHeAry, function (i, zhuhe) {
                        var posNamesAry = [];
                        $.each(zhuhe, function (j, pos) {
                            posNamesAry.push(posShowNames[pos]);
                        });
                        $.each(_result, function (j, betContent) {
                            _newResult.push($.extend({}, betContent, {
                                totalMoney: util.moneyFormat(betContent.totalMoney / betPosZhuHeAry.length),
                                totalNums: util.toFixed(betContent.totalNums / betPosZhuHeAry.length, 1),
                                poschoose: zhuhe.join(','),
                                poschooseName: posNamesAry.join(','),
                                showContent: betContent.betInfo + '(' + posNamesAry.join(',') + ')'
                            }))
                        })
                    });
                    result = _newResult
                } else {
                    result = _result
                }
            } else if (currentTemplateConfig.tpl === 'hezhi2' || currentTemplateConfig.tpl === 'renxuan1') {
                var betPos = confirmBetContent.poschoose.split(',');
                var zhuHeLen;
                var posShowNames;
                if (currentTemplateConfig.tpl === 'renxuan1') {
                    zhuHeLen = currentTemplateConfig.posLen
                    posShowNames = currentTemplateConfig.posNames;
                } else {
                    zhuHeLen = currentTemplateConfig.algorithm[1];
                    posShowNames = currentTemplateConfig.posNames;
                }
                var betPosZhuHeAry = util.CPrint(betPos, zhuHeLen);
                $.each(betPosZhuHeAry, function (i, zhuhe) {
                    var posNamesAry = [];
                    $.each(zhuhe, function (j, pos) {
                        posNamesAry.push(posShowNames[pos]);
                    });
                    result.push($.extend({}, confirmBetContent, {
                        totalMoney: util.moneyFormat(confirmBetContent.totalMoney / betPosZhuHeAry.length),
                        totalNums: util.toFixed(confirmBetContent.totalNums / betPosZhuHeAry.length, 1),
                        poschoose: zhuhe.join(','),
                        poschooseName: posNamesAry.join(','),
                        showContent: confirmBetContent.betInfo + '(' + posNamesAry.join(',') + ')'
                    }))
                });
            } else if (currentTemplateConfig.algorithm[0] === 'R7') {
                var betPos = confirmBetContent.poschoose.split(',');
                var betPosZhuHeAry = util.CPrint(betPos, currentTemplateConfig.algorithm[1]);
                var betRowNums = confirmBetContent.betInfo.split('|')
                $.each(betPosZhuHeAry, function (i, zhuhe) {
                    var posNamesAry = [];
                    var newBetInfoAry = []
                    $.each(zhuhe, function (j, pos) {
                        posNamesAry.push(currentTemplateConfig.sub[0][pos]);
                        newBetInfoAry.push(betRowNums[betPos.indexOf(pos)])
                    });
                    var totalNums = 1;
                    $.each(newBetInfoAry, function (_, v) {
                        totalNums = totalNums * v.split(",").length;
                    })
                    result.push($.extend({}, confirmBetContent, {
                        betInfo: newBetInfoAry.join('|'),
                        totalMoney: util.moneyFormat(confirmBetContent.money * totalNums * confirmBetContent.multiple),
                        totalNums: totalNums,
                        poschoose: zhuhe.join(','),
                        poschooseName: posNamesAry.join(','),
                        showContent: newBetInfoAry.join('|') + '(' + posNamesAry.join(',') + ')'
                    }))
                });
            } else if (currentTemplateConfig.algorithm[0] === 'R6') {
                var betPos = confirmBetContent.poschoose.split(',');
                var betRowNums = confirmBetContent.betInfo.split('|')
                $.each(betRowNums, function (i, rowNums) {
                    var posName = currentTemplateConfig.sub[0][betPos[i]];
                    var betCount = rowNums.split(',').length;
                    result.push($.extend({}, confirmBetContent, {
                        betInfo: rowNums,
                        totalMoney: util.moneyFormat(betCount * confirmBetContent.money * confirmBetContent.multiple),
                        totalNums: betCount,
                        poschoose: betPos[i],
                        poschooseName: posName,
                        showContent: rowNums + '(' + posName + ')'
                    }))
                });
            } else {
                result.push(confirmBetContent);
            }
            return result
        }
        $('.betNum-btn .add-btn').on('click', function () {
            if ($(this).hasClass('activate')) {
                var orderList = drawOrder()
                $.each(orderList, function (i, order) {
                    betContentList.push(order);
                });
                onBetContentListChange();
                tplClearBetInfo();
            } else {
                xdialog.show({content: '号码选择不完整，请重新选择'});
            }
        });
        $('#confirmBetBtn').on('click', function () {
            if (betContentList.length === 0) {
                xdialog.show({content: '投注列表不能为空'});
                return;
            }
            postBetG(betContentList);
        });
        $('.betNum-btn .confirm-btn').on('click', function () {
            if ($(this).hasClass('activate1')) {
                postBetG(drawOrder());
            } else {
                xdialog.show({content: '号码选择不完整，请重新选择'});
            }
        });
        $('.betNum-list .delete-btn').on('click', function () {
            betContentList = [];
            onBetContentListChange();
        });
        $('.betNum-list .Random-btn').on('click', function () {
            var randomNum = $('input[name=randomNum]').val() || 1;
            randomNum = parseInt(randomNum);
            var randomRange, tplConfig = currentTemplateConfig, randomFormat = tplConfig.format[0], result = [],
                isRandomNumber = true;
            if (randomNum > 50) {
                xdialog.show({content: '随机数不能大于50'});
                return;
            }
            if (randomNum < 1) {
                xdialog.show({content: '随机数不能小于1'});
                return;
            }
            if (betContentList.length + randomNum > 500) {
                xdialog.show({content: '投注列表已满，请您先确认投注后再购买新的注单'});
                return;
            }
            if (typeof tplConfig.sub[1][0] == 'number') {
                randomRange = tplConfig.sub[1];
            } else {
                randomRange = [0, tplConfig.sub[1].length - 1];
                isRandomNumber = false;
            }
            // var dialog = dialog({
            //     content: "正在随机生成注单，请稍后...",
            //     fixed: !0,
            //     lock: !0
            // }).show();
            try {
                var notRepeat = randomFormat.indexOf("m") > -1;
                var isGroupInput = !!tplConfig.isGroupInput;
                var isDefineEveryRange = tplConfig.sub.length > 2 && randomFormat.match(/[a-z]/gi).length + 1 === tplConfig.sub.length;
                for (; randomNum > 0;) {
                    var curPosIndex = 0, isR10 = "R10" === tplConfig.algorithm[0], numAry = [];
                    result.push(randomFormat.replace(/n|m/g, function () {
                        var num = util.random(randomRange);
                        numAry.push(num);
                        if (isRandomNumber) {
                            return num >= 10 || openNumberLen == 1 ? num : '0' + num;
                        } else if (isDefineEveryRange) {
                            return tplConfig.sub[++curPosIndex][num];
                        } else if (isR10 && tplConfig.algorithm[1]) {
                            return tplConfig.algorithm[1][num];
                        } else {
                            return tplConfig.sub[1][num]
                        }
                    }));
                    var noRepeatAryLen = util.arrayGetDistinctValues(numAry).length;
                    if (notRepeat && noRepeatAryLen !== numAry.length || isGroupInput && noRepeatAryLen === 1) {
                        result.pop();
                    } else {
                        randomNum--;
                    }
                }
                var count = tplConfig.count || 1;
                addRandomBet(result, count);
            } catch (t) {
                console.error(t);
                // window.console && console.log("随机出现异常：" + t.name + "：" + t.message)
            } finally {
                // dialog.close().remove()
            }
        });
        var clearAll = function () {
            if (tplClearBetInfo) {
                tplClearBetInfo();
            }
            betContentList = [];
            confirmBetContent = null;
            onBetContentListChange();
        };
        export_clearAll = clearAll;

        function postBetG(betList) {
            var turnNum = $('#turnNum').val();
            if (!turnNum) {
                xdialog.show({content: '还未开盘，请稍后！'});
                return;
            }
            var totalBetMoney = 0;
            var totalCount = 0;
            for (var i = 0; i < betList.length; i++) {
                totalBetMoney += betList[i].totalMoney;
                totalCount += betList[i].totalNums;
            }
            totalCount = util.toFixed(totalCount, 0)
            var cancel  = "";
            if( system_config.hy_is_cancel == 0 ){
                cancel = "<span style='color: red;font-size: 16px'>请注意：投注成功后不可撤单 </span><br/>";
            }
            xdialog.show({
                content: cancel + '确定投注 第【' + turnNum + '】期吗?<br/>总共' + totalCount + '笔' + betList.length + '单，合计' + util.toFixed(totalBetMoney, 4) + '元',
                showCancel: true,
                okClick: function () {
                    if (isPostBet) {
                        return
                    }
                    isPostBet = true
                    var loadingDialog = layer.load(0, {shade: 0});
                    $.ajax({
                        url: '/api/bet/betG',
                        type: 'POST',
                        cache: false,
                        contentType: "application/json",
                        data: JSON.stringify({
                            turnNum: turnNum,
                            gameId: gameId,
                            totalMoney: totalBetMoney,
                            content: betList
                        }),
                        success: function (response) {
                            xdialog.show({content: '<span class="succeed">投注成功！</span>'})
                            clearAll();
                            loadBetRecord();
                            userInfoManager.load();
                        },
                        error: ajaxErrorHandler,
                        complete: function () {
                            isPostBet = false
                            layer.close(loadingDialog);
                        }
                    })
                }
            });
        }

        reBetRecordAction = function (record) {// 再次下注
            var betContent = {
                code: record.cateCode,
                cateName: record.cateName,
                money: record.money,
                betInfo: record.betInfo,
                odds: record.odds,
                totalMoney: record.totalMoney,
                totalNums: record.totalNums,
                rebate: record.rebate,
                multiple: record.multiple,
                betModel: record.betModel,
                poschoose: record.poschoose,
                poschooseName: record.poschooseName
            };
            postBetG([betContent]);
        };
        var allTemplate = {
            'renxuan1': {
                render: function (config) {
                    var renderData = {
                        rows: [],
                        size: config.sub[0].length
                    }
                    for (var i = 0; i < config.sub[0].length; i++) {
                        renderData.rows.push({
                            name: config.sub[0][i],
                            nums: makeNumAry(config.sub[1][0], config.sub[1][1])
                        });
                    }
                    setGameHtml(template('tpl-renxuan1', renderData));
                    this.init(config);
                },
                init: function (config) {
                    var defaultCheckedPos = config.defaultCheckedPos || [0, 1, 2, 3, 4];
                    for (var i = 0; i < defaultCheckedPos.length; i++) {
                        $('.con-toolbar .checkbox[for=ds-ck-' + defaultCheckedPos[i] + ']').addClass('checkbox-checked');
                    }
                    var vm = this;

                    function updateShowSelectedPosInfo() {
                        var posInfo = vm.getSelectedPos();
                        $('#posCheckedCount').html(posInfo.betPos.length);
                        $('#posCombCount').html(util.C(posInfo.betPos.length, config.posLen));
                    }

                    updateShowSelectedPosInfo();
                    $('.con-toolbar input[type=checkbox]').on('change', function () {
                        var cb = $(this).parents('.checkbox');
                        if (cb.hasClass('checkbox-checked')) {
                            cb.removeClass('checkbox-checked');
                        } else {
                            cb.addClass('checkbox-checked');
                        }
                        onBetContentChange();
                        updateShowSelectedPosInfo();
                    });
                    $('.sumBtn_box .num').on('click', function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                        }
                        onBetContentChange();
                    });
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .bigBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num >= 5;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .oddBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 1;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .evenBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 0;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .smallBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num < 5;
                        });
                        onBetContentChange();
                    })
                },
                selectBall: function (a, predicate) {
                    $(a).parents('.sumBtn_list').find('.num').each(function (index, e) {
                        var num = $(e).attr('data-num')
                        if (predicate(parseInt(num))) {
                            $(e).addClass('active');
                        } else if ($(e).hasClass('active')) {
                            $(e).removeClass('active');
                        }
                    });
                },
                getSelectedPos: function () {
                    var betPos = [], betPosNames = [];
                    $('.con-toolbar .checkbox.checkbox-checked').each(function (index, e) {
                        betPos.push($(this).find('input').attr('value'));
                        betPosNames.push($(this).find('input').attr('data-name'));
                    });
                    return {
                        betPos: betPos,
                        betPosNames: betPosNames
                    }
                },
                getBetContent: function () {
                    var nums = [];
                    $('.sumBtn_list').each(function (index, e) {
                        var row = [];
                        $(e).find('.num').each(function (j, e2) {
                            if ($(e2).hasClass('active')) {
                                row.push($(e2).attr('data-num'));
                            }
                        })
                        nums.push(row)
                    });
                    return $.extend({nums: nums, posLen: currentTemplateConfig.posLen}, this.getSelectedPos());
                },
                clearBetInfo: function () {
                    $('.sumBtn_list .num').removeClass('active');
                    onBetContentChange()
                }
            },
            'hezhi1': {
                render: function (config) {
                    var renderData = {
                        rows: [],
                        size: config.sub[0].length
                    };
                    for (var i = 0; i < config.sub[0].length; i++) {
                        renderData.rows.push({
                            name: config.sub[0][i],
                            nums: makeNumAry(config.sub[1][0], config.sub[1][1])
                        });
                    }
                    setGameHtml(template('tpl-hezhi1', renderData));
                    this.initListener();
                },
                initListener: function () {
                    $('.sumBtn_box .num').on('click', function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                        }
                        onBetContentChange();
                    })
                },
                getBetContent: function () {
                    var nums = [];
                    $('.sumBtn_list').each(function (index, e) {
                        var row = [];
                        $(e).find('.num').each(function (j, e2) {
                            if ($(e2).hasClass('active')) {
                                row.push($(e2).attr('data-num'));
                            }
                        })
                        nums.push(row)
                    });
                    return nums;
                },
                clearBetInfo: function () {
                    $('.sumBtn_list .num').removeClass('active');
                    onBetContentChange()
                }
            },
            'hezhi2': {
                render: function (config) {
                    var renderData = {
                        rows: [],
                        size: config.sub[0].length
                    }
                    for (var i = 0; i < config.sub[0].length; i++) {
                        renderData.rows.push({
                            name: config.sub[0][i],
                            nums: makeNumAry(config.sub[1][0], config.sub[1][1])
                        });
                    }
                    setGameHtml(template('tpl-hezhi2', renderData));
                    this.init(config);
                },
                init: function (config) {
                    for (var i = 0; i < config.defaultCheckedPos.length; i++) {
                        $('.con-toolbar .checkbox[for=ds-ck-' + config.defaultCheckedPos[i] + ']').addClass('checkbox-checked');
                    }
                    var vm = this;

                    function updateShowSelectedPosInfo() {
                        var posInfo = vm.getSelectedPos();
                        $('#posCheckedCount').html(posInfo.betPos.length);
                        $('#posCombCount').html(util.C(posInfo.betPos.length, config.posLen));
                    }

                    updateShowSelectedPosInfo();
                    $('.con-toolbar input[type=checkbox]').on('change', function () {
                        var cb = $(this).parents('.checkbox');
                        if (cb.hasClass('checkbox-checked')) {
                            cb.removeClass('checkbox-checked');
                        } else {
                            cb.addClass('checkbox-checked');
                        }
                        onBetContentChange();
                        updateShowSelectedPosInfo();
                    });
                    $('.sumBtn_box .num').on('click', function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                        }
                        onBetContentChange();
                    })
                },
                getSelectedPos: function () {
                    var betPos = [], betPosNames = [];
                    $('.con-toolbar .checkbox.checkbox-checked').each(function (index, e) {
                        betPos.push($(this).find('input').attr('value'));
                        betPosNames.push($(this).find('input').attr('data-name'));
                    });
                    return {
                        betPos: betPos,
                        betPosNames: betPosNames
                    }
                },
                getBetContent: function () {
                    var nums = [];
                    $('.sumBtn_list').each(function (index, e) {
                        var row = [];
                        $(e).find('.num').each(function (j, e2) {
                            if ($(e2).hasClass('active')) {
                                row.push($(e2).attr('data-num'));
                            }
                        })
                        nums.push(row)
                    });
                    return $.extend({nums: nums, posLen: currentTemplateConfig.posLen}, this.getSelectedPos());
                },
                clearBetInfo: function () {
                    $('.sumBtn_list .num').removeClass('active');
                    onBetContentChange()
                }
            },
            'danshi1': {
                render: function (config) {
                    var renderData = {inputTip: renderConfig.inputTip}
                    setGameHtml(template('tpl-danshi1', renderData));
                    this.initListener();
                },
                initListener: function () {
                    // $('.sumBtn_box textarea').on('keyup', function () {
                    //     onBetContentChange();
                    // });
                    var vm = this
                    $('.sumBtn_box .Empty').on('click', function () {
                        vm.clearBetInfo()
                    });
                    $('.sumBtn_box .DeleteDuplicate').on('click', function () {
                        var betInfo = algorithm(currentTemplateConfig, tplGetBetContent());
                        var ary = betInfo.content.split("|");
                        var newAry = [];
                        $.each(ary, function (index, num) {
                            newAry.push(num.split(',').join(""));
                        });
                        $('.sumBtn_box textarea').val(newAry.join(","));
                    });
                    $(".sumBtn_box textarea").on("input propertychange", function () {
                        onBetContentChange();
                    });
                    var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
                        browse_button: 'btnImport',
                        url: 'upload.html',
                    });
                    uploader.init(); //初始化
                    $('.sumBtn_box .Import').on('click', function () {
                        uploader.bind('FilesAdded', function (uploader, files) {
                            for (var i = 0, len = files.length; i < len; i++) {
                                var reader = new FileReader();
                                //将文件以文本形式读入页面
                                reader.readAsText(files[i].getNative());
                                reader.onload = function (f) {
                                    if (this.result.length > 1000) {
                                        this.result = this.result.substring(0, 1000);
                                    }
                                    $('.sumBtn_box textarea').val(this.result);
                                    onBetContentChange();
                                }
                                //构造html来更新UI
                            }
                            ;
                        });
                    })

                },
                getBetContent: function () {
                    return $('.sumBtn_box textarea').val();
                },
                clearBetInfo: function () {
                    $('.sumBtn_box textarea').val('');
                    onBetContentChange()
                }
            },
            'danshi2': {
                render: function (config) {
                    setGameHtml(template('tpl-danshi2', {inputTip: renderConfig.inputTip}));
                    this.init(config);
                },
                init: function (config) {
                    for (var i = 0; i < config.defaultCheckedPos.length; i++) {
                        $('.con-toolbar .checkbox[for=ds-ck-' + config.defaultCheckedPos[i] + ']').addClass('checkbox-checked');
                    }
                    var vm = this;

                    function updateShowSelectedPosInfo() {
                        var posInfo = vm.getSelectedPos();
                        $('#posCheckedCount').html(posInfo.betPos.length);
                        $('#posCombCount').html(util.C(posInfo.betPos.length, config.algorithm[0]));
                    }

                    updateShowSelectedPosInfo();
                    $('.con-toolbar input[type=checkbox]').on('change', function () {
                        var cb = $(this).parents('.checkbox');
                        if (cb.hasClass('checkbox-checked')) {
                            cb.removeClass('checkbox-checked');
                        } else {
                            cb.addClass('checkbox-checked');
                        }
                        onBetContentChange();
                        updateShowSelectedPosInfo();
                    });
                    $("#danshi2TextArea").on("input propertychange", function () {
                        onBetContentChange();
                    });
                    $('.sumBtn_box .Empty').on('click', function () {
                        vm.clearBetInfo();
                        onBetContentChange();
                    });
                    $('.sumBtn_box .DeleteDuplicate').on('click', function () {
                        var betInfo = algorithm(currentTemplateConfig, vm.getBetContent());
                        var ary = betInfo.content.split("|");
                        var newAry = [];
                        $.each(ary, function (index, num) {
                            newAry.push(num.split(',').join(""));
                        });
                        $('#danshi2TextArea').val(newAry.join(","));
                    });
                    var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
                        browse_button: 'btnImport',
                        url: 'upload.html',
                    });
                    uploader.init(); //初始化
                    $('.sumBtn_box .Import').on('click', function () {
                        uploader.bind('FilesAdded', function (uploader, files) {
                            for (var i = 0, len = files.length; i < len; i++) {
                                var reader = new FileReader();
                                //将文件以文本形式读入页面
                                reader.readAsText(files[i].getNative());
                                reader.onload = function (f) {
                                    $('.sumBtn_box textarea').val(this.result);
                                    onBetContentChange();
                                }
                                //构造html来更新UI
                            }
                            ;
                        });
                    });
                },
                getSelectedPos: function () {
                    var betPos = [], betPosNames = [];
                    $('.con-toolbar .checkbox.checkbox-checked').each(function (index, e) {
                        betPos.push($(this).find('input').attr('value'));
                        betPosNames.push($(this).find('input').attr('data-name'));
                    });
                    return {
                        betPos: betPos,
                        betPosNames: betPosNames
                    }
                },
                getBetContent: function () {
                    var posInfo = this.getSelectedPos();
                    return $.extend({text: $('#danshi2TextArea').val()}, posInfo);
                },
                clearBetInfo: function () {
                    $('#danshi2TextArea').val('');
                    onBetContentChange();
                }
            },
            'num1': {
                tplName: 'tpl-num1',
                render: function (config) {
                    var renderData = {
                        rows: [],
                        size: config.sub[0].length
                    };
                    var isDefineEveryRange = config.sub[0].length === config.sub.length - 1;
                    if (typeof config.sub[1][0] === 'number' && !isDefineEveryRange) {// 没有每一位的下注内容并且是数字的
                        for (var i = 0; i < config.sub[0].length; i++) {
                            renderData.rows.push({
                                name: config.sub[0][i],
                                nums: makeNumAry(config.sub[1][0], config.sub[1][1], openNumberLen > 1)
                            });
                        }
                    } else if (typeof config.sub[1][0] === 'number' && isDefineEveryRange) {// 定义了每一位的下注内容并且是数字的
                        for (var i = 0; i < config.sub[0].length; i++) {
                            renderData.rows.push({
                                name: config.sub[0][i],
                                nums: typeof config.sub[i + 1][0] === 'number' ? makeNumAry(config.sub[i + 1][0], config.sub[i + 1][1], openNumberLen > 1) : config.sub[i + 1]
                            });
                        }
                        // if(config.sub[2] && config.sub[2].length > 0){
                        //     for (var i = 0;i<config.sub[2].length;i++){
                        //         console.log(config.sub[2][i]);
                        //     }
                        // }
                    } else if (isDefineEveryRange) {// 定义了每一位的下注内容
                        for (var i = 0; i < config.sub[0].length; i++) {
                            renderData.rows.push({name: config.sub[0][i], nums: config.sub[i + 1]});
                        }
                    } else { // 没有定义每一位的内容
                        for (var i = 0; i < config.sub[0].length; i++) {
                            renderData.rows.push({name: config.sub[0][i], nums: config.sub[1]});
                        }
                    }
                    setGameHtml(template(this.tplName, renderData, {escape: false}));
                    this.init(config);
                    if (config.algorithm[0] === 'R10'
                        && config.algorithm.length > 1
                        && config.algorithm[1]
                        && config.algorithm[1].length === config.sub[1].length) {
                        $('.sumBtn_box .num').each(function (i, e) {
                            $(e).attr('data-num', config.algorithm[1][i]);
                        });
                    }
                },
                selectBall: function (a, predicate) {
                    $(a).parents('.sumBtn_list').find('.num').each(function (index, e) {
                        var num = $(e).attr('data-num')
                        if (predicate(parseInt(num))) {
                            $(e).addClass('active');
                        } else if ($(e).hasClass('active')) {
                            $(e).removeClass('active');
                        }
                    });
                },
                canSelectedBall: function (betContent, config) {
                    if (config.maxCheckedLen) {
                        var totalLen = 0
                        $.each(betContent, function (index, nums) {
                            totalLen += nums.length;
                        });
                        if (totalLen >= config.maxCheckedLen) {
                            xdialog.show({content: '最多只能选择' + config.maxCheckedLen + '个号码'})
                            return false;
                        }
                    }
                    return true;
                },
                init: function (config) {
                    var vm = this;
                    $('.sumBtn_list .num').on('click', function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            onBetContentChange();
                        } else if (vm.canSelectedBall(vm.getBetContent(), config)) {
                            $(this).addClass('active');
                            onBetContentChange();
                        }
                    });
                    this.initExtra(config)
                },
                initExtra: function (config) {
                    var vm = this;
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .oddBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 1;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .evenBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 0;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .bigBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num >= (config.sub[1][1] - config.sub[1][0]) / 2 + config.sub[1][0];
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .smallBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num < (config.sub[1][1] - config.sub[1][0]) / 2 + config.sub[1][0];
                        });
                        onBetContentChange();
                    })
                },
                getBetContent: function () {
                    var nums = [];
                    $('.sumBtn_list').each(function (index, e) {
                        var row = [];
                        $(e).find('.num').each(function (j, e2) {
                            if ($(e2).hasClass('active')) {
                                row.push($(e2).attr('data-num'));
                            }
                        })
                        nums.push(row)
                    });
                    return nums;
                },
                setBetContent: function (betInfo) {
                    var rows = betInfo.split('|')
                    $.each(rows, function (index, row) {
                        var nums = row.split(',')
                        $.each(nums, function (j, num) {
                            $('.sumBtn_list:eq(' + index + ') .num[data-num=' + num + ']').addClass('active')
                        })
                    })
                },
                clearBetInfo: function () {
                    $('.sumBtn_box .num').removeClass('active');
                    onBetContentChange()
                }
            },
            'num2': {
                tplName: 'tpl-num2',
                initExtra: function () {
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').removeClass('active');
                        onBetContentChange();
                    });
                }
            },
            num3: {
                tplName: 'tpl-num3',
                setOdds: function (odds) {
                    // console.log(('num3-odds', odds));
                    currentTemplateConfig.tmpOdds = odds;
                    $('.sumBtn_box .num-odds').each(function (i, e) {
                        $(this).html(odds[($($('.sumBtn_box .num')[i]).attr('data-num'))]);
                    });
                },
                initExtra: function (config) {
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                }
            },
            'num3-1': {
                tplName: 'tpl-num3-1',
                initExtra: function (config) {
                    allTemplate.num1.initExtra(config);
                }
            },
            num4: {
                tplName: 'tpl-num4',
                initExtra: function (config) {
                }
            },
            num5: {
                tplName: 'tpl-num5',
                initExtra: function (config) {
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                }
            },
            'num5-1': {
                tplName: 'tpl-num5-1',
                initExtra: function (config) {
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                },
                setOdds: function (odds) {
                    $('.sumBtn_box .Bbtn2-odds').each(function (i, e) {
                        $(this).html(odds[($($('.sumBtn_box .num')[i]).attr('data-num'))]);
                    });
                }
            }, num6: {
                tplName: 'tpl-num6',
                init: function (config) {
                    $('.sumBtn_list .num').on('click', function () {
                        var thisNum = $(this).attr('data-num');
                        var preNum = thisNum.length == 1 ? thisNum + "" + thisNum : thisNum.charAt(0);
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                            $('.num').each(function (_, e) {
                                var n = $(e).attr('data-num')
                                if (n == preNum) {
                                    if ($(e).hasClass('active')) {
                                        $(e).removeClass('active')
                                    }
                                }
                            })
                        }
                        onBetContentChange();
                    })
                    this.initExtra(config)
                },
                initExtra: function (config) {
                    $('.sumBtn_box .allBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').addClass('active');
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                },
            }, num7: {
                tplName: 'tpl-num7',
                initExtra: function (config) {
                    var vm = this;
                    $('.sumBtn_box .oddBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 1;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .evenBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num % 2 === 0;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .delBtn').on('click', function () {
                        $(this).parents('.sumBtn_list').find('.num').each(function (index, e) {
                            if ($(e).hasClass('active')) {
                                $(e).removeClass('active');
                            }
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .bigBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num > 10;
                        });
                        onBetContentChange();
                    });
                    $('.sumBtn_box .smallBtn').on('click', function () {
                        vm.selectBall(this, function (num) {
                            return num <= 10;
                        });
                        onBetContentChange();
                    })
                },
                setOdds: function (odds) {
                    currentTemplateConfig.tmpOdds = odds;
                    $('.sumBtn_box .num-pl-box').each(function (i, e) {
                        var iE = $('.sumBtn_box .num')[i];
                        var p = ($(iE).attr('data-num'));
                        $(this).html(odds[p]);
                    });
                }
            }
        };
        // 继承关系
        allTemplate.num2 = $.extend({}, allTemplate.num1, allTemplate.num2);
        allTemplate.num3 = $.extend({}, allTemplate.num1, allTemplate.num3);
        allTemplate['num3-1'] = $.extend({}, allTemplate.num3, allTemplate['num3-1']);
        allTemplate.num4 = $.extend({}, allTemplate.num1, allTemplate.num4);
        allTemplate.num5 = $.extend({}, allTemplate.num1, allTemplate.num5);
        allTemplate['num5-1'] = $.extend({}, allTemplate.num1, allTemplate['num5-1']);
        allTemplate.num6 = $.extend({}, allTemplate.num1, allTemplate.num6);
        allTemplate.num7 = $.extend({}, allTemplate.num1, allTemplate.num7);

        // 模板渲染分配
        return function (config, initBetInfo) {
            tplGetBetContent = null;
            tplClearBetInfo = null;
            var tpl = allTemplate[config.tpl];
            if (tpl) {
                if (tpl.getBetContent) {
                    tplGetBetContent = tpl.getBetContent;
                }
                if (tpl.clearBetInfo) {
                    tplClearBetInfo = tpl.clearBetInfo
                }
                currentTemplateConfig = config;
                tpl.render(config);
                if (tpl.setBetContent && initBetInfo) {
                    tpl.setBetContent(initBetInfo)
                }
                onBetContentChange();
                if (!tplGetBetContent) {
                    console.warn('tpl ' + config.tpl + ' not complete getBetContent   =' + tplGetBetContent)
                }
                if (!tplClearBetInfo) {
                    console.warn('tpl ' + config.tpl + ' not complete tplClearBetInfo =' + tplClearBetInfo)
                }
            } else {
                console.warn('tpl error:' + config.tpl);
            }
        };
    }();
    var playCateMap, playMap, gameId = 26, gameName, initPlayCateCode, initMutiple, initBetInfo;
    var renderConfig;
    var curTab, curTabChild, curPlayCate;
    var topTabRender = template.compile('{{each plays p}}<a href="javascript:void(0)" code="{{p.code}}">{{p.name}}</a>{{/each}}');
    var tabChildRender = template.compile('{{each plays p}}<div><span>{{p.name}}：</span> {{each p.sub s}} <a href="javascript:;" code="{{s.code}}">{{s.name}}</a>{{/each}}</div>{{/each}}')
    var betContentListRender = template.compile('<tbody>\
        {{each list bet index}}\
        <tr data-index="{{index}}"> \
            <td>{{bet.cateName}}</td>\
            <td width="160"><div class="ellipsis" style="width:160px" title="{{bet.showContent}}">{{bet.showContent}}</div></td>\
            <td>{{if bet.betModel === 0}}元{{else if bet.betModel === 1}}角{{else if bet.betModel === 2}}分{{/if}}</td>\
            <td><span>{{bet.totalNums}}</span>注</td>\
            <td><span>{{bet.multiple}}</span>倍</td>\
            <td><span>{{bet.totalMoney}}</span>元</td>\
            <td><a href="javascript:void(0)" class="btn bet-list-remove">X</a></td>\
        </tr>\
        {{/each}}\
      </tbody>');

    var onTabClick = function (tabCode) {
        $('.mainNav-list a.active').removeClass('active')
        $('.mainNav-list a[code=' + tabCode + ']').addClass('active');

        curTab = findTabPlayByCode(tabCode);
        curTabChild = playCateMap[tabCode];
        for (var i = 0; i < curTabChild.length; i++) {
            curTabChild[i].sub = playCateMap[curTabChild[i].code];
        }
        var html = tabChildRender({plays: curTabChild});
        $('.mainNav-children').html(html);
        $('.mainNav-children a').on('click', function () {
            onSubTabClick(this);
        });
        var initPlayCateElm
        if (initPlayCateCode) {
            initPlayCateElm = $('.mainNav-children a[code=' + initPlayCateCode + ']')[0]
        }
        if (!initPlayCateElm) {
            initPlayCateElm = $('.mainNav-children a')[0]
        }
        onSubTabClick(initPlayCateElm)
    }, onSubTabClick = function (a) {
        $('.mainNav-children a.select').removeClass('select');
        $(a).addClass('select');
        var code = $(a).attr('code');
        if (code && renderConfig[code]) {
            curPlayCate = findSubTabInCurTab(code);
            $('.current-game').html('<span><b>' + curTab.name + '</b>：<label>' + curPlayCate.name + '</label></span>');
            $('#configDescription').html(renderConfig[code].description);
            $('.help-tips .help-exp').attr('data-tip', renderConfig[code].example);
            $('.help-tips .help-help').attr('data-tip', renderConfig[code].rule);
            if (renderConfig[code].format) { // 显示、隐藏随机号码生成
                $('.betB-w40 .fleft').show();
            } else {
                $('.betB-w40 .fleft').hide();
            }
            if (!playMap[curPlayCate.code]) {
                console.warn("no found play in playMap playCateCode=" + curPlayCate.code);
                return;
            }
            gameRender(renderConfig[code], initBetInfo);
            initBetInfo = null
            onInputChange();  // 设置显示赔率
        } else {
            console.error('not found render config:' + code);
        }
    }, findSubTabInCurTab = function (code) {
        for (var i = 0; i < curTabChild.length; i++) {
            for (var j = 0; j < curTabChild[i].sub.length; j++) {
                if (curTabChild[i].sub[j].code === code) {
                    return curTabChild[i].sub[j];
                }
            }
        }
        console.warn('no found sub tab with code = ' + code);
    }, findTabPlayByCode = function (tabCode) {
        for (var i = 0; i < playCateMap[gameId].length; i++) {
            if (playCateMap[gameId][i].code === tabCode) {
                return playCateMap[gameId][i];
            }
        }
        console.warn('no found tab data with code=' + tabCode);
    }, initView = function () {
        var topTabs = topTabRender({'plays': playCateMap[gameId]});
        $('.mainNav-list').html(topTabs);
        $('.mainNav-list a').on('click', function () {
            onTabClick($(this).attr('code'));
        });
        $('.mainNav-list a:first-child').addClass('active');
        initInputListener();
        if (initPlayCateCode) {
            function isContainPlayCateCode(tabCode) {
                for (var j = 0; j < playCateMap[tabCode].length; j++) {
                    var mCode = playCateMap[tabCode][j].code
                    for (var k = 0; k < playCateMap[mCode].length; k++) {
                        if (playCateMap[mCode][k].code === initPlayCateCode) {
                            return true
                        }
                    }
                }
                return false
            }

            function setInitTab() {
                for (var i = 0; i < playCateMap[gameId].length; i++) {
                    var tabCode = playCateMap[gameId][i].code
                    if (isContainPlayCateCode(tabCode)) {
                        onTabClick(tabCode)
                        return
                    }
                }
                onTabClick(playCateMap[gameId][0].code);
            }

            setInitTab();
        } else {
            onTabClick(playCateMap[gameId][0].code);
        }
        bindHoverTip($('.help-tips span'));
        $('#batchCancelOrderBtn').on('click', function () {// 批量撤销订单
            var cancelOrderNoAry = [];
            $('.bet-history tbody tr td:nth-child(1) input:checked').each(function () {
                cancelOrderNoAry.push($(this).val());
            });
            cancelOrder(cancelOrderNoAry);
        });
        //监听追号勾选框
        $('#CK-Out-stopAfterWin').bind('click', function () {
            if ($(this).find('#CK_Out_label').hasClass('select')) {
                $(this).find('#CK_Out_label').removeClass('select')
            } else {
                $(this).find('#CK_Out_label').addClass('select')
            }
        })

        $('.NumberCheck .Continue-btn').on('click', function () {
            if (betContentList.length === 0) {
                xdialog.show({
                    content: '注单列表为空，请先下注！或者随机1注', okName: '随机1注', showCancel: true, okClick: function () {
                        // console.log("aaaaa")
                        //     randomBet();
                        $('input[name=randomNum]').val(1);
                        $('.betNum-list .Random-btn').click();
                        $('.NumberCheck .Continue-btn').click();
                    }
                });
            } else {
                loadAdditionalPeriod();
            }
        });
        $('.bet-history thead th:nth-child(1) input').on('click', function () {
            var selectedAll = $('.bet-history thead th:nth-child(1) input').prop('checked');
            $('.bet-history tbody tr td:nth-child(1) input').prop('checked', selectedAll);
            onCancelOrderCheckChange();
        });
    }, initInputListener = function () {
        //  初始化倍率输入
        if (initMutiple && /^[0-9]+$/.test(initMutiple)) {
            inputMulTiple = parseInt(initMutiple);
            $('#allPrice').val(initMutiple);
        }
        $('.plus').bind('click', function (event) {
            event.stopPropagation();
            price(1)
        });
        $('.minus').bind('click', function (event) {
            event.stopPropagation();
            price(-1)
        });
        $('#allPrice').on('keyup', function () {
            inputMulTiple = parseInt($('#allPrice').val());
            if (!inputMulTiple) {
                inputMulTiple = 1;
            }
            onInputChange();
        });

        function price(data) {
            var nowPrice = parseInt($('#allPrice').val());
            if (data == 1) {
                if (nowPrice > 999999) return false;
                inputMulTiple += 1;
            }
            if (data == -1) {
                if (nowPrice == 1) return false;
                inputMulTiple -= 1;
            }
            $('#allPrice').val(inputMulTiple);
            onInputChange();
        }

        var isok = true;
        $("#allPrice").focus(function (event) {
            isok = false;
            event.stopPropagation();
            var amountZi = $(' .amountZi').css({"display": "block"});
            var height = amountZi.height();
            var offset = $(this).offset();
            amountZi.offset({
                left: offset.left,
                top: offset.top - height
            });
        });
        $("#allPrice").blur(function () {
            isok = true;
        });
        $(' .amountZi').find('span').bind('click', function () {
            inputMulTiple = parseInt($(this).text());
            $("#allPrice").val(inputMulTiple);
            onInputChange();
            $(' .amountZi').css({"display": "none"})
        })
        $(window).bind('click', function (event) {
            if (isok) {
                $(' .amountZi').css({"display": "none"})
            }
        })
        // 初始化模式输入
        //******    圆角分 二级  菜单
        var isYes = true;
        $(".betNum-btn .select-box").bind('click', function () {
            isYes = false;
            var staus = $('#MoneyUnitWrap').css('display');
            switch (staus) {
                case "block":
                    $('#MoneyUnitWrap').stop().slideUp(100);
                    break;
                case "none":
                    $('#MoneyUnitWrap').stop().slideDown(100);
                    break;
            }
        });
        $('#MoneyUnitWrap').find('li').bind('click', function () {
            isYes = false;
            var Money_unit = $(this).text();
            inputBetModel = parseInt($(this).find('a').attr('data-value'));
            onInputChange();
            $('.unit').find('span').text(Money_unit);
            $('#MoneyUnitWrap').stop().slideUp(100);
        })
        $('#MoneyUnitWrap').mouseout(function () {
            isYes = true;
        })
        $(".select-box").mouseout(function () {
            isYes = true;
        })
        $(window).bind('click', function (event) {
            if (isYes) {
                $('#MoneyUnitWrap').stop().slideUp(100);
            }
        })
        // 初始反水比例
        $("#v-slider").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: 100,
            slide: onSlideValueChange,
            change: onSlideValueChange
        });

        function onSlideValueChange(event, ui) {
            var _inputRebate = getRebate();
            if (_inputRebate !== inputRebate) {
                inputRebate = _inputRebate;
                onInputChange();
            }
        }

        function getRebate() {
            var sliderValue = $("#v-slider").slider("value");
            // console.log(sliderValue);
            var caculateMaxRebate = Math.min(util.floor(officialUserRebate, 1), curPlayCate.rebate);
            return parseFloat(((1 - sliderValue / 100) * caculateMaxRebate).toFixed(1));
        }

        function setSliderValue() {
            var caculateMaxRebate = Math.min(util.floor(officialUserRebate, 1), curPlayCate.rebate);
            var sliderValue = (1 - inputRebate / caculateMaxRebate) * 100;
            $("#v-slider").slider("value", sliderValue);
            onInputChange();
        }

        // 增加
        $('.Plus').bind('click', function () {
            if (inputRebate - 0.1 < 0) {
                return;
            }
            inputRebate -= 0.1;
            setSliderValue();
        });
        // 减
        $('.minues').bind('click', function () {
            if (inputRebate + 0.1 > curPlayCate.rebate) {
                return;
            }
            inputRebate += 0.1;
            setSliderValue();
        });
    }, bindHoverTip = function (e) {
        if ($('#hoverDialog').length === 0) {
            $('body').append('<div id="hoverDialog" tabindex="-1" style="position: absolute; outline: 0px; left: 436px; top: 406px; z-index: 1024;display: none">\
                <div i="dialog" class="hover-tips">\
                    <table><tbody><tr><td style="padding: 5px;">\
                        <div>\
                            <div class="content break-wrod"></div>\
                        </div>\
                    </td></tr></tbody></table>\
                </div>\
            </div>');
        }
        $(e).hover(function (e) {
            var position = $(this).offset();
            $('#hoverDialog .content').html($(this).attr('data-tip'));
            var positionType = $(this).attr('data-position');
            var dialogWidth = $('#hoverDialog').width(), dialogHeight = $('#hoverDialog').height();
            var left, top;
            if (positionType === 'mouse') {
                left = e.pageX + 10;
                if (left + dialogWidth + 10 > window.innerWidth) {
                    left = e.pageX - dialogWidth - 10;
                }
                top = e.pageY - dialogHeight - 10;
            } else {
                left = position.left - (dialogWidth - $(this).width()) / 2;
                top = position.top - dialogHeight - 10;
            }
            $('#hoverDialog').css({left: left, top: top});
            $('#hoverDialog').show();
        }, function () {
            $('#hoverDialog').hide();
        });
    }, getNowDate = function () {
        var date = new Date()
        var formatNum = function (num) {
            if (num < 10) {
                return '0' + num
            }
            return '' + num
        }
        return date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' + formatNum(date.getDate())
    }, betRecordRender = template.compile('{{each data row}}<tr data-position="mouse" data-tip="注单编号：&nbsp;{{row.orderNo}}<br/>{{gameName}}【{{row.cateName}}】{{row.turnNum}}期<br/>投注：&nbsp;{{row.tipBetInfo}}<br/>扣款：&nbsp;<span class=\'status-unlottery\'>-{{row.totalMoney}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;({{row.money}}元 * {{row.multiple}}倍 * {{row.totalNums}}注)<br/>返点：&nbsp;<span class=\'status-win\'>{{row.rebateMoney}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;(扣款 * {{(row.rebate).toFixed(1)}}%)<br/>奖金：&nbsp;<span class=\'status-lottery\'>{{row.reward.toFixed(2)}}元</span>">\
            <td>{{if row.canCancelOrder}}<input type="checkbox" value="{{row.orderNo}}">{{/if}}</td>\
            <td>{{row.orderNo}}</td>\
            <td>{{row.cateName}}</td>\
            <td>{{row.turnNum}}</td>\
            <td>{{row.addTime}}</td>\
            <td class="ellipsis">{{row.showContent}}</td>\
            <td>{{row.multiple}}倍/{{row.betModel == 0 ? "元" : row.betModel == 1 ? "角":"分"}}</td>\
            <td>{{row.totalMoney}}元</td>\
            <td>{{row.status == 1 && row.result == 1 ? row.reward : 0}}元</td>\
            <td>\
                {{if row.status == 0 && row.canCancelOrder && allowCancel}}<span class="record-status status-undo">可撤销{{if row.trackOrderNo !=""}}[追]{{/if}}</span>\
                {{else if row.status === 0}}<span class="record-status status-lottery">未开奖</span>\
                {{else if row.status == 1 && row.result == 0}}<span class="record-status status-lose">未中奖</span>\
                {{else if row.status == 1 && row.result == 1}}<span class="record-status status-win">已派奖</span>\
                {{else if row.status == 1 && row.result == 2}}<span class="record-status status-nowin">和局</span>\
                {{else if row.status == 2}}<span class="record-status status-hasundo">撤销</span>\
                {{else if row.status == 3}}<span class="record-status status-delete">删除</span>\
                {{else if row.status == 4}}<span class="record-status status-delete">追号停止</span>\
                {{/if}}\
            </td>\
        </tr>{{/each}}')
        , loadBetRecord = function () {
        $.ajax({
            url: '/v/report/getLatelyBetInfo/' + gameId + '?model=0',
            type: 'GET',
            cache: false,
            success: function (response) {
                if (!response || typeof response === 'string') {
                    return;
                }
                var curTimestamp = new Date().getTime();
                var hasCanCancelOrder = false;
                for (var i = 0; i < response.length; i++) {
                    response[i].earnMoney = util.moneyFormat(response[i].reward - response[i].totalMoney);
                    response[i].gameName = gameName;
                    if (curTimestamp < new Date(response[i].betEndTime).getTime() && response[i].status == 0) {
                        response[i].canCancelOrder = true;
                        hasCanCancelOrder = true;
                    } else {
                        response[i].canCancelOrder = false;
                    }
                    response[i].tipBetInfo = response[i].betInfo
                    if (response[i].tipBetInfo.length > 1000) {
                        response[i].tipBetInfo = response[i].tipBetInfo.substr(0, 1000) + '...'
                    }
                    if (response[i].poschoose) {
                        response[i].showContent = response[i].betInfo + '(' + response[i].poschooseName + ')'
                    } else {
                        response[i].showContent = response[i].betInfo
                    }
                }
                if (hasCanCancelOrder) {
                    $('.bet-history thead th:nth-child(1) input').show();
                } else {
                    $('.bet-history thead th:nth-child(1) input').hide();
                }
                var html = betRecordRender({data: response, gameName: gameName});
                $('.bet-history tbody').html(html);
                bindHoverTip($('.bet-history tbody tr'));
                $('.bet-history tbody tr td:nth-child(1) input').on('change', function () {
                    onCancelOrderCheckChange();
                });
                $('.bet-history tbody tr td').not($('.bet-history tbody tr td:first-child')).on('click', function () {
                    var betOrderNo = $(this).parents('tr').find('td:nth-child(2)').text();
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].orderNo == betOrderNo) {
                            makeBetOrderDetailCanWinList(response[i]);
                            showBetOrderDetailDialog(response[i]);
                            break;
                        }
                    }
                });
            }
        })
    }, makeBetOrderDetailCanWinList = function (betOrder) {
        var oddsAry = betOrder.odds.split(',');
        var canWinList = []
        if (oddsAry.length > 1) {
            var oddsNameAry = betOrder.oddsName.split(',')
            $.each(oddsAry, function (i, odds) {
                canWinList.push({
                    name: oddsNameAry[i],
                    odds: odds,
                    betInfo: betOrder.betInfo,
                    canWinMoney: util.moneyFormat(odds * betOrder.multiple)
                })
            })
        } else {
            var canWinName = betOrder.cateName;
            canWinList.push({
                name: canWinName,
                odds: betOrder.odds,
                betInfo: betOrder.betInfo,
                canWinMoney: util.moneyFormat(betOrder.odds * betOrder.multiple)
            });
        }
        betOrder.canWinList = canWinList;
    }, loadAdditionalPeriod = function () {
        $.ajax({
            type: "get",
            url: "/v/lottery/getAllLottery?gameId=" + $("#gameId").val(),
            success: function (data) {
                showAddtionalBetDialog(data, betContentList)
            }
        });
    }
        , showAddtionalBetDialog = function (data, betContentList) {
        var newBetContentList = JSON.parse(JSON.stringify(betContentList));
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer, form = layui.form();
            var openedLayer;
            var additionBetDialogIndex = layer.open({
                title: gameName + "追号",
                btnAlign: '000000',
                shade: 0.7,
                type: 2,                   // type 为1 时  引入当前文档的内容 可通过id或者直接写入内容在content
                skin: 'layui-layer-rim',   //加上边框
                area: ['800px', '455px'],   //宽高
                btn: ['清空追号', '直接投注', '取消'],
                scrollbar: false,
                content: ['/page/game/official/additional_bets.html', 'no'],
                success: function (layero, index) {
                    openedLayer = layero;
                    var changeBtn = function (name) {
                        $('.layui-layer-btn1').html(name);
                    }
                    $(layero).find('iframe')[0].contentWindow.setPeriodContent(data, newBetContentList, changeBtn);
                },
                btn1: function (layero, index) {
                    var params = $(openedLayer).find('iframe')[0].contentWindow.selectPeriod();
                },
                btn2: function (layero, inde) {
                    var params = $(openedLayer).find('iframe')[0].contentWindow.generateOrder();
                    if (params.list.length == 0) {
                        //直接投注
                        $('#confirmBetBtn').click();
                        return;
                    }
                    var turnNum = $('#turnNum').val();
                    if (!turnNum) {
                        xdialog.show({content: '还未开盘，请稍后！'});
                        return;
                    }
                    var gameId = $('#gameId').val();
                    if (isPostBet) {
                        return
                    }
                    isPostBet = true
                    $.ajax({
                        url: '/api/bet/trace',
                        type: 'POST',
                        cache: false,
                        contentType: "application/json",
                        data: JSON.stringify({
                            gameId: gameId,
                            totalMoney: params.totalMoney,
                            traceTurnList: params.list,
                            content: newBetContentList,
                            stopAfterWin: params.stopAfterWin
                        }),
                        success: function (response) {
                            xdialog.show({content: '<span class="succeed">投注成功！</span>'})
                            export_clearAll();
                            loadBetRecord();
                            userInfoManager.load();
                        },
                        error: ajaxErrorHandler,
                        complete: function () {
                            isPostBet = false
                            // layer.close(loadingDialog);
                        }
                    })

                }
            });
        });
    }, showBetOrderDetailDialog = function (betOrder, tplConfig) {


        var btn = [];


        if (betOrder.trackOrderNo == '') {

          if(allowCancel){
            btn = [betOrder.canCancelOrder ? '撤单' : '再次下注', '确定'];
          }else {
            btn = ['再次下注', '确定'];
          }

        } else {
          if(allowCancel){
            btn = [betOrder.canCancelOrder ? '撤单' : '再次下注', '确定', '追号详情'];
          }else {
            btn = ['再次下注', '确定', '追号详情'];
          }
        }

        layui.use(['layer', 'form'], function () {
            var layer = layui.layer, form = layui.form();
            //页面层
            var betOrderDetailIndex = layer.open({
                title: "投注详情",
                btnAlign: '000000',
                shade: 0.7,
                type: 2,                   // type 为1 时  引入当前文档的内容 可通过id或者直接写入内容在content
                skin: 'layui-layer-rim',   //加上边框
                area: ['800px', '540px'],   //宽高
                scrollbar: false,
                resize: false,
                content: ['/page/game/official/bet_detail_dialog.html', 'no'],
                success: function (layero, index) {
                    $(layero).find('iframe')[0].contentWindow.setBetContent(betOrder, tplConfig);
                },
                btn: btn,
                btn1: function (layero, index) {
                    if (betOrder.canCancelOrder&&allowCancel) {
                        cancelOrder([betOrder.orderNo]);
                    } else {
                        reBetRecordAction(betOrder);
                    }
                    // reBetRecordAction(betOrder);
                    layer.close(betOrderDetailIndex);
                },
                btn2: function (layero, index) { // 确定
                    return true;
                },
                btn3: function (layero, index) { // 追号详情

                    $.ajax({
                        url: '/api/trace/querySingle?orderNo=' + betOrder.trackOrderNo,
                        type: 'GET',
                        cache: false,
                        contentType: "application/json",
                        success: function (response) {
                            showZhDetail(response, betOrder)
                        },
                        error: ajaxErrorHandler,
                        complete: function () {
                        }
                    })
                }
            });
        });
    }, showZhDetail = function (orderInfo, betOrder) {

        layui.use(['layer', 'form'], function () {
            var layer = layui.layer, form = layui.form();
            var openedLayer;
            //页面层
            var zhLayer = layer.open({
                title: "追号详情",
                btnAlign: '000000',
                shade: 0.7,
                type: 2,                   // type 为1 时  引入当前文档的内容 可通过id或者直接写入内容在content
                skin: 'layui-layer-rim',   //加上边框
                area: ['800px', '500px'],   //宽高
                scrollbar: false,
                resize: false,
                content: ['/page/game/include/zh_detail.html', 'no'],
                success: function (layero, index) {
                    openedLayer = layero;
                    orderInfo.gameName = betOrder.gameName
                    $(layero).find('iframe')[0].contentWindow.setZhContent(orderInfo);
                },
            });
        });
    }, onCancelOrderCheckChange = function () {
        var selectedLength = $('.bet-history tbody tr td:nth-child(1) input:checked').length;
        var isSelectedAll = $('.bet-history tbody tr td:nth-child(1) input').length === selectedLength;
        if (selectedLength > 0) {
            $('#batchCancelOrderBtn').show();
            $('#batchCancelOrderBtn b').html('(' + selectedLength + ')');
        } else {
            $('#batchCancelOrderBtn').hide();
        }
        $('.bet-history thead th:nth-child(1) input').prop('checked', isSelectedAll);
    }, cancelOrder = function (orderNoAry) {
        xdialog.show({
            content: '即将撤销<b>' + orderNoAry.length + '</b>笔注单，确定要继续操作吗？', showCancel: true, okClick: function () {
                if (isPostBet) {
                    return
                }
                isPostBet = true
                var loadingDialog = layer.load(0, {shade: 0});
                $.ajax({
                    url: '/api/bet/cancel',
                    type: 'POST',
                    cache: false,
                    data: {orderNo: orderNoAry.join(',')},
                    success: function (response) {
                        xdialog.show({content: '<span class="succeed">撤单成功' + orderNoAry.length + '条</span>'});
                        loadBetRecord();
                        userInfoManager.load();
                    },
                    error: ajaxErrorHandler,
                    complete: function () {
                        isPostBet = false
                        layer.close(loadingDialog);
                    }
                })
            }
        });
    }, ajaxErrorHandler = function (response) {
    };

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    gameId = $('#gameId').val();
    gameName = $('#gameId').attr('data-gameName');
    initPlayCateCode = getQueryString("code");
    initMutiple = getQueryString("mutiple")
    initBetInfo = getQueryString("betInfo")

    $(function () {
        Promise.all([
            $.ajax({
                url: '/data/json/official/config_' + gameId + '.json',
                type: 'GET',
                cache: false,
                dataType: 'json'
            }),
            $.ajax({url: '/data/json/official/' + gameId + '.json', type: 'GET', cache: false, dataType: 'json'})
        ]).then(function (response) {
            renderConfig = response[0];
            openNumberLen = renderConfig.numberLen || 1;
            if (!initPlayCateCode && renderConfig.defaultPlayCode) {
                initPlayCateCode = renderConfig.defaultPlayCode
            }
            playCateMap = response[1].playCateMap;
            playMap = response[1].playMap;
            if (!userInfoIsLoaded) {
                officialUserRebate = system_config.visitors_rebate;
            }
            initView();
            loadBetRecord();
        }, function (error) {
            alert('网络异常，请稍后重试!')
        });
    })
    return {
        clear: export_clearAll,
        userInfoLoaded: function () {
            officialUserRebate = userRebate;
            userInfoIsLoaded = true;
            if (officialUserRebate == 0) {
                $("#v-slider").slider('option', 'disabled', true);
            }
            onInputChange();
        },
        refreshBetRecord: loadBetRecord
    }
})();