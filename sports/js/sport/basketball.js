var basketBall = function () {


    var getTemplateData = function (type) {
        switch (type) {
            case 'bk_ft_all':
                return templateBK_FT_ALL;
            case 'bk_rb_re':
                return templateBK_RB_RE;
            case 'bk_ft_p3':
                return templateBK_FT_P3;
            case 'bk_fu_all':
                return templateBK_FU_ALL;
            case 'bk_fu_p3':
                return templateBK_FU_P3;
            default:
                return ''
        }
    } ,templateBK_FU_P3 = {
            title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">主客队伍</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="15%">大小</th>\
            </tr>',
            match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen" rowspan="2">\
            	{{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            	</td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
            	<td class="b_rig borderTop" check-value="ior_PRH">{{if ior_PRH}}<span class="con">{{if strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_fu_p3\',\'ior_RH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_PRH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_rig borderTop" check-value="ior_POUH">{{if ior_POUH}}<span class="con">大{{ratio_o.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_fu_p3\',\'ior_OUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_POUH | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
        	<td class="b_rig borderBottom" check-value="ior_PRC">{{if ior_PRC}}<span class="con">{{if !strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_fu_p3\',\'ior_RC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_PRC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_POUC">{{if ior_POUC}}<span class="con">小{{ratio_u.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_fu_p3\',\'ior_OUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_POUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
        '
        }
    , templateBK_FU_ALL = {
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">赛事</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="15%">大小</th>\
                <th nowrap="" width="6%">单双</th>\
            </tr>',
        match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen" rowspan="2">\
                 {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
                </td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}<span class="con">{{if strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_fu_all\',\'ior_RH\',{{gid}})">{{ior_RH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_fu_all\',\'ior_OUH\',{{gid}})">{{ior_OUH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_fu_all\',\'ior_EOO\',{{gid}})"  title="单"  > {{ior_EOO | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}<span class="con">{{if !strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_fu_all\',\'ior_RC\',{{gid}})">{{ior_RC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_fu_all\',\'ior_OUC\',{{gid}})">{{ior_OUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_fu_all\',\'ior_EOE\',{{gid}})"  title="双"  > {{ior_EOE | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
        '
    }


    ,templateBK_FT_P3 = {
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">主客队伍</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="15%">大小</th>\
            </tr>',
        match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen" rowspan="2">{{datetime | dateFormat:\'hh:mm\'}}</td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_rig borderTop" check-value="ior_PRH">{{if ior_PRH}}<span class="con">{{if strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_ft_p3\',\'ior_RH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_PRH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_rig borderTop" check-value="ior_POUH">{{if ior_POUH}}<span class="con">大{{ratio_o.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_ft_p3\',\'ior_OUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_POUH | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
            <td class="b_rig borderBottom" check-value="ior_PRC">{{if ior_PRC}}<span class="con">{{if !strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_ft_p3\',\'ior_RC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_PRC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_POUC">{{if ior_POUC}}<span class="con">小{{ratio_u.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.betChuan(\'bk_ft_p3\',\'ior_OUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')">{{ior_POUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
        '
    }


    ,templateBK_RB_RE = {
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">主客队伍</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="15%">大小</th>\
            </tr>',
        match: '<tr id="tr1_{{gid}}"> \
                <td rowspan="2" class="b_cen">{{if scoreH !=null && scoreC!=null}}<div class="time_box"><p>\
                <span style="font-size:10.5px;font-family: Serif">{{sessionNum}}</span></p><p class="score"><span>{{scoreH}} - {{scoreC}}</span></p></div>{{/if}}</td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
                <td check-value="ior_RH" class="b_rig borderTop">{{if ior_RH}}<span class="con">{{if strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_rb_re\',\'ior_RH\',{{gid}})" >{{ior_RH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" title="大" onclick="order.bet(\'bk_rb_re\',\'ior_OUH\',{{gid}})" >{{ior_OUH | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}<span class="con">{{if !strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_rb_re\',\'ior_RC\',{{gid}})">{{ior_RC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con" >小{{ratio_u.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" title="小" onclick="order.bet(\'bk_rb_re\',\'ior_OUC\',{{gid}})">{{ior_OUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            </tr>\
        '
    }


    , templateBK_FT_ALL = {
       /* title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">赛事</th>\
                <th nowrap="" class="h_1x2">独赢</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="10%">大小</th>\
                <th nowrap="" width="6%">单双</th>\
            </tr>', */
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th>\
                <th nowrap="" class="team">赛事</th>\
                <th nowrap="" width="10%">让球</th>\
                <th nowrap="" width="15%">大小</th>\
                <th nowrap="" width="6%">单双</th>\
            </tr>',
        /*match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen" rowspan="2">\
                 {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
                </td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_cen" check-value="ior_MH">{{if ior_MH}}<a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_MH\',{{gid}})"  title="0~1"  > {{ior_MH | toFixed: 2}}</a>{{/if}}</td> \
                <td class="b_rig" check-value="ior_RH">{{if ior_RH}}<span class="con">{{ratio}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_RH\',{{gid}})">{{ior_RH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_rig" check-value="ior_OUH">{{if ior_OUH}}<span class="con">{{ratio_o}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_OUH\',{{gid}})">{{ior_OUH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_cen" check-value="ior_EOO">{{if ior_EOO}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_EOO\',{{gid}})"  title="0~1"  > {{ior_EOO | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
            <td class="b_cen" check-value="ior_MC">{{if ior_MC}}<a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_MC\',{{gid}})"  title="0~1"  > {{ior_MC | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig" check-value="ior_RC">{{if ior_RC}}<span class="con"></span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_RC\',{{gid}})">{{ior_RC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig" check-value="ior_OUC">{{if ior_OUC}}<span class="con">{{ratio_u}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_OUC\',{{gid}})">{{ior_OUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_cen" check-value="ior_EOE">{{if ior_EOE}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_EOE\',{{gid}})"  title="0~1"  > {{ior_EOE | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
        '*/
        match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen" rowspan="2">\
                 {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
                </td>\
                <td class="team_name" rowspan="2">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_rig borderTop" check-value="ior_RH"><span class="con">{{if strong}}{{ratio}}{{/if}}</span>\
                <span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_RH\',{{gid}})">{{ior_RH | toFixed: 2}}</a> </span></td>\
                <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_OUH\',{{gid}})">{{ior_OUH | toFixed: 2}}</a> </span>{{/if}}</td>\
                <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_EOO\',{{gid}})"  title="单"  >  {{ior_EOO | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
            <tr id="tr2_{{gid}}">\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}<span class="con">{{if !strong}}{{ratio}}{{/if}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_RC\',{{gid}})">{{ior_RC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span><span class="radio"><a href="javascript:void(0)" onclick="order.bet(\'bk_ft_all\',\'ior_OUC\',{{gid}})">{{ior_OUC | toFixed: 2}}</a> </span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<span class="b_cen"><a href="javascript:void(0)"  onclick="order.bet(\'bk_ft_all\',\'ior_EOE\',{{gid}})"  title="双"  > {{ior_EOE | toFixed: 2}}</a></span>{{/if}}</td>\
            </tr>\
        '
    }, getTableName = function (type) {
        switch (type) {
            case 'bk_ft_all':
                return '今日篮球和美式足球 :'
            case 'bk_rb_re':
                return '篮球和美式足球:滚球'
            case 'bk_ft_p3':
                return '今日篮球和美式足球:综合过关'
            case 'bk_fu_all':
                return '早盘篮球和美式足球:'
            default:
                return ''
        }
    }
    return {
        getTemplateData: getTemplateData,
        getTableName: getTableName
    }
}()
