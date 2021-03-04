var footBall = function () {
    var getTemplateData = function (type) {
        switch (type) {
            case 'ft_ft_t':
                return templateFt_Ft_T;
            case 'ft_ft_r':
                return templateFt_Ft_R;
            case 'ft_ft_pd':
                return templateFt_Ft_Pd;
            case 'ft_ft_hpd':
                return templateFt_Ft_HPd;
            case 'ft_ft_f':
                return templateFt_Ft_F;
            case 'ft_ft_p3':
                return templateFt_Ft_P3;
            case 'ft_rb_re':
                return templateFt_Rb_Re;
            case 'ft_fu_r':
                return templateFt_Fu_R;
            case 'ft_fu_pd':
                return templateFt_Fu_Pd;
            case 'ft_fu_hpd':
                return templateFt_Fu_HPd;
            case 'ft_fu_f':
                return templateFt_Fu_F;
            case 'ft_fu_t':
                return templateFt_Fu_T;
            case 'ft_fu_p3':
                return templateFt_Fu_P3;
            default:
                return ''
        }
    }, templateFt_Fu_P3 = {
        columnsNum: 9,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th nowrap="" class="time">时间</th>\
            <th nowrap="" class="team">赛事</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">全场 - 让球</th>\
            <th nowrap="" class="h_ou">全场 - 大小</th>\
            <th nowrap="" class="h_oe">单双</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">半场 - 让球</th>\
            <th nowrap="" class="h_ou">半场 - 大小</th>\
         </tr>',
        match: '<tr id="tr1_{{gid}}""> \
            <td rowspan="3" class="b_cen">\
                {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td>\
            <td rowspan="2" class="team_name" >{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen borderTop" check-value="ior_MH">{{if ior_MH}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_MH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="" >{{ior_MH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}{{if strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_RH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_RH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_OUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="大">{{ior_OUH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_EOO\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="单">{{ior_EOO | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderTop" check-value="ior_HMH">{{if ior_HMH}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HMH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_HMH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HRH">{{if ior_HRH}}{{if hstrong}}<span class="con">{{hratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HRH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_HRH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HOUH">{{if ior_HOUH}}<span class="con">大{{hratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HOUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="大">{{ior_HOUH | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}"" >\
            <td class="b_cen borderBottom" check-value="ior_MC">{{if ior_MC}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_MC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}" ><font>{{ior_MC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}{{if !strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_RC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}">{{ior_RC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_OUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="小">{{ior_OUC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_EOE\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="双">{{ior_EOE | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderBottom" check-value="ior_HMC">{{if ior_HMC}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HMC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}"><font>{{ior_HMC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HRC">{{if ior_HRC}}{{if !hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HRC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}">{{ior_HRC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HOUC">{{if ior_HOUC}}<span class="con">小{{hratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HOUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="小">{{ior_HOUC | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr3_{{gid}}">\
            <td class="team_name" id="TR_11-1350180_1">和局</td>\
            <td class="b_cen" check-value="ior_MN">{{if ior_MN}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_MN\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="和"><font>{{ior_MN | toFixed: 2}}</font></a>{{/if}}</td>\
            <td colspan="3" valign="top" class="b_cen"></td>\
            <td class="b_1st" check-value="ior_HMN">{{if ior_HMN}}<a href="javascript:;" onclick="order.betChuan(\'ft_fu_p3\',\'ior_HMN\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="和">{{ior_HMN | toFixed: 2}}</a>{{/if}}</td>\
            <td colspan="2" valign="top" class="b_1st">&nbsp;</td>\
        </tr>\
        '
    }, templateFt_Fu_T = {
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th> \
                <th nowrap="" class="team">主客队</th> \
                <th nowrap="" class="h_1x2">0~1</th> \
                <th nowrap="" class="h_r">2~3</th> \
                <th nowrap="" class="h_ou">4~6</th> \
                <th nowrap="" class="h_oe">7或以上</th> \
            </tr>',
        match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen">\
                    {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                    {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                    {{if runningball}}<font color="red">滚球</font>{{/if}}\
                </td>\
                <td class="b_cen">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_cen" check-value="ior_T01">{{if ior_T01}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_fu_t\',\'ior_T01\',{{gid}})"  title="0~1"  >{{ior_T01 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_T23">{{if ior_T23}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_fu_t\',\'ior_T23\',{{gid}})"  title="2~3"  >{{ior_T23 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_T46">{{if ior_T46}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_fu_t\',\'ior_T46\',{{gid}})"  title="4~6"  >{{ior_T46 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_OVER">{{if ior_OVER}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_fu_t\',\'ior_OVER\',{{gid}})"  title="7+"  >{{ior_OVER | toFixed: 2}}</a>{{/if}}</td>\
            </tr>\
        '
    }, templateFt_Fu_F = {
        columnsNum: 11,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">主/主</th>\
            <th class="h_1x2">主/和</th>\
            <th class="h_1x2">主/客</th>\
            <th class="h_1x2">和/主</th>\
            <th class="h_1x2">和/和</th>\
            <th class="h_1x2">和/客</th>\
            <th class="h_1x2">客/主</th>\
            <th class="h_1x2">客/和</th>\
            <th class="h_1x2">客/客</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}"> \
            <td class="b_cen">\
                {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen" check-value="ior_FHH">{{if ior_FHH}}<a title="主/主" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FHH\', {{gid}})"  >{{ior_FHH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FHN">{{if ior_FHN}}<a title="主/和" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FHN\', {{gid}})"  >{{ior_FHN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FHC">{{if ior_FHC}}<a title="主/客" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FHC\', {{gid}})"  >{{ior_FHC | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNH">{{if ior_FNH}}<a title="和/主" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FNH\', {{gid}})"  >{{ior_FNH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNN">{{if ior_FNN}}<a title="和/和" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FNN\', {{gid}})"  >{{ior_FNN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNC">{{if ior_FNC}}<a title="和/客" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FNC\', {{gid}})"  >{{ior_FNC | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCH">{{if ior_FCH}}<a title="客/主" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FCH\', {{gid}})"  >{{ior_FCH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCN">{{if ior_FCN}}<a title="客/和" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FCN\', {{gid}})"  >{{ior_FCN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCC">{{if ior_FCC}}<a title="客/客" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_f\',\'ior_FCC\', {{gid}})"  >{{ior_FCC | toFixed: 2}}</a>{{/if}}</td>\
        </tr>'
    }, templateFt_Fu_Pd = {
        columnsNum: 18,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">1:0</th>\
            <th class="h_1x2">2:0</th>\
            <th class="h_1x2">2:1</th>\
            <th class="h_1x2">3:0</th>\
            <th class="h_1x2">3:1</th>\
            <th class="h_1x2">3:2</th>\
            <th class="h_1x2">4:0</th>\
            <th class="h_1x2">4:1</th>\
            <th class="h_1x2">4:2</th>\
            <th class="h_1x2">4:3</th>\
            <th class="h_1x2">0:0</th>\
            <th class="h_1x2">1:1</th>\
            <th class="h_1x2">2:2</th>\
            <th class="h_1x2">3:3</th>\
            <th class="h_1x2">4:4</th>\
            <th class="h_1x2">其他</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}">\
            <td rowspan="2" class="b_cen">\
                {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" rowspan="2" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H1C0">{{if ior_H1C0}}<a title="1:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H1C0\', {{gid}})"  >{{ior_H1C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H2C0">{{if ior_H2C0}}<a title="2:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H2C0\', {{gid}})"  >{{ior_H2C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H2C1">{{if ior_H2C1}}<a title="2:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H2C1\', {{gid}})"  >{{ior_H2C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C0">{{if ior_H3C0}}<a title="3:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H3C0\', {{gid}})"  >{{ior_H3C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C1">{{if ior_H3C1}}<a title="3:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H3C1\', {{gid}})"  >{{ior_H3C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C2">{{if ior_H3C2}}<a title="3:2" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H3C2\', {{gid}})"  >{{ior_H3C2}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C0">{{if ior_H4C0}}<a title="4:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H4C0\', {{gid}})"  >{{ior_H4C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C1">{{if ior_H4C1}}<a title="4:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H4C1\', {{gid}})"  >{{ior_H4C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C2">{{if ior_H4C2}}<a title="4:2" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H4C2\', {{gid}})"  >{{ior_H4C2}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C3">{{if ior_H4C3}}<a title="4:3" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H4C3\', {{gid}})"  >{{ior_H4C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H0C0">{{if ior_H0C0}}<a  title="0:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H0C0\', {{gid}})">{{ior_H0C0}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H1C1">{{if ior_H1C1}}<a  title="1:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H1C1\', {{gid}})">{{ior_H1C1}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H2C2">{{if ior_H2C2}}<a  title="2:2" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H2C2\', {{gid}})">{{ior_H2C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H3C3">{{if ior_H3C3}}<a  title="3:3" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H3C3\', {{gid}})">{{ior_H3C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H4C4">{{if ior_H4C4}}<a  title="4:4" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_H4C4\', {{gid}})">{{ior_H4C4}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_OVH">{{if ior_OVH}}<a  title="其他比分" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_pd\',\'ior_OVH\', {{gid}})">{{ior_OVH}}</a>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}">\
            <td class="b_cen" check-value="ior_H0C1">{{if ior_H0C1}}<a style=""  title="0:1" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H0C1\', {{gid}})">{{ior_H0C1}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C2">{{if ior_H0C2}}<a style=""  title="0:2" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H0C2\', {{gid}})">{{ior_H0C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C2">{{if ior_H1C2}}<a style=""  title="1:2" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H1C2\', {{gid}})">{{ior_H1C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C3">{{if ior_H0C3}}<a style=""  title="0:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H0C3\', {{gid}})">{{ior_H0C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C3">{{if ior_H1C3}}<a style=""  title="1:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H1C3\', {{gid}})">{{ior_H1C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H2C3">{{if ior_H2C3}}<a style=""  title="2:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H2C3\', {{gid}})">{{ior_H2C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C4">{{if ior_H0C4}}<a style=""  title="0:4" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H0C4\', {{gid}})">{{ior_H0C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C4">{{if ior_H1C4}}<a style=""  title="1:4" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H1C4\', {{gid}})">{{ior_H1C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H2C4">{{if ior_H2C4}}<a style=""  title="2:4" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H2C4\', {{gid}})">{{ior_H2C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H3C4">{{if ior_H3C4}}<a style=""  title="3:4" href="javascript:void(0)" onclick="order.bet(\'ft_fu_pd\',\'ior_H3C4\', {{gid}})">{{ior_H3C4}}</a>{{/if}}</td>\
        </tr>'
    }, templateFt_Fu_R = {
        columnsNum: 9,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th nowrap="" class="time">时间</th>\
            <th nowrap="" class="team">赛事</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">全场 - 让球</th>\
            <th nowrap="" class="h_ou">全场 - 大小</th>\
            <th nowrap="" class="h_oe">单双</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">半场 - 让球</th>\
            <th nowrap="" class="h_ou">半场 - 大小</th>\
         </tr>',
        match: '<tr id="tr1_{{gid}}""> \
            <td rowspan="3" class="b_cen">\
                {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td>\
            <td rowspan="2" class="team_name" >{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen borderTop" check-value="ior_MH">{{if ior_MH}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_MH\',{{gid}})" title="" >{{ior_MH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}{{if strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_RH\',{{gid}})" title="{{team_h}}">{{ior_RH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_OUH\',{{gid}})" title="大">{{ior_OUH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_EOO\',{{gid}})" title="单">{{ior_EOO | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderTop" check-value="ior_HMH">{{if ior_HMH}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HMH\',{{gid}})" title="{{team_h}}">{{ior_HMH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HRH">{{if ior_HRH}}{{if hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HRH\',{{gid}})" title="{{team_h}}">{{ior_HRH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HOUH">{{if ior_HOUH}}<span class="con">大{{hratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HOUH\',{{gid}})" title="大">{{ior_HOUH | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}"" >\
            <td class="b_cen borderBottom" check-value="ior_MC">{{if ior_MC}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_MC\',{{gid}})" title="{{team_c}}" ><font>{{ior_MC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}{{if !strong}}<span class="con">{{ratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_RC\',{{gid}})" title="{{team_c}}">{{ior_RC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_OUC\',{{gid}})" title="小">{{ior_OUC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_EOE\',{{gid}})" title="双">{{ior_EOE | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderBottom" check-value="ior_HMC">{{if ior_HMC}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HMC\',{{gid}})" title="{{team_c}}"><font>{{ior_HMC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HRC">{{if ior_HRC}}{{if !hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HRC\',{{gid}})" title="{{team_c}}">{{ior_HRC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HOUC">{{if ior_HOUC}}<span class="con">小{{hratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HOUC\',{{gid}})" title="小">{{ior_HOUC | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr3_{{gid}}"">\
            <td class="team_name" id="TR_11-1350180_1">和局</td>\
            <td class="b_cen"  check-value="ior_MN">{{if ior_MN}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_MN\',{{gid}})" title="和"><font>{{ior_MN | toFixed: 2}}</font></a>{{/if}}</td>\
            <td colspan="3" valign="top" class="b_cen"></td>\
            <td class="b_1st"  check-value="ior_HMN">{{if ior_HMN}}<a href="javascript:;" onclick="order.bet(\'ft_fu_r\',\'ior_HMN\',{{gid}})" title="和">{{ior_HMN | toFixed: 2}}</a>{{/if}}</td>\
            <td colspan="2" valign="top" class="b_1st">&nbsp;</td>\
        </tr>\
        '
    }, templateFt_Rb_Re = {
        columnsNum: 11,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th nowrap="" class="time">时间</th>\
            <th nowrap="" class="team">赛事</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">全场 - 让球</th>\
            <th nowrap="" class="h_ou">全场 - 大小</th>\
            <th nowrap="" class="h_oe">单双</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">半场 - 让球</th>\
            <th nowrap="" class="h_ou">半场 - 大小</th>\
         </tr>',
        match: '<tr id="tr1_{{gid}}"> \
            <td rowspan="3" class="b_cen"><div class="time_box"><p><span>{{retimeset}}</span></p><p class="score"><span>{{score_h}} - {{score_c}}</span></p></div></td>\
            <td rowspan="2" class="team_name" >{{team_h}}{{if redcard_h>0}}<lable title="红牌" style="background:#C00000;text-align:center;line-height:14px;width:13px;height:14px;display:block;border-radius:4px;color:white;float:right;">{{redcard_h}}</lable>{{/if}}<br>{{team_c}}{{if redcard_c>0}}<lable title="红牌" style="background:#C00000;text-align:center;line-height:14px;width:13px;height:14px;display:block;border-radius:4px;color:white;float:right;">{{redcard_c}}</lable>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_MH">{{if ior_MH}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_MH\', {{gid}})" title="" >{{ior_MH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}{{if strong}}<span class="con">{{ratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_RH\', {{gid}})" title="{{team_h}}">{{ior_RH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_OUH\', {{gid}})" title="大">{{ior_OUH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_EOO\', {{gid}})" title="单">{{ior_EOO | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderTop" check-value="ior_HMH">{{if ior_HMH}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HMH\', {{gid}})" title="{{team_h}}">{{ior_HMH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HRH">{{if ior_HRH}}{{if hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HRH\', {{gid}})" title="{{team_h}}">{{ior_HRH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HOUH">{{if ior_HOUH}}<span class="con">大{{hratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HOUH\', {{gid}})" title="大">{{ior_HOUH | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}" >\
            <td class="b_cen borderBottom" check-value="ior_MC">{{if ior_MC}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_MC\', {{gid}})" title="{{team_c}}" ><font>{{ior_MC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}{{if !strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_RC\', {{gid}})" title="{{team_c}}">{{ior_RC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_OUC\', {{gid}})" title="小">{{ior_OUC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_EOE\', {{gid}})" title="双">{{ior_EOE | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderBottom" check-value="ior_HMC">{{if ior_HMC}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HMC\', {{gid}})" title="{{team_c}}"><font>{{ior_HMC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HRC">{{if ior_HRC}}{{if !hstrong}}<span class="con">{{hratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HRC\', {{gid}})" title="{{team_c}}">{{ior_HRC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HOUC">{{if ior_HOUC}}<span class="con">小{{hratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HOUC\', {{gid}})" title="小">{{ior_HOUC | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr3_{{gid}}">\
            <td class="team_name" id="TR_11-1350180_1">和局</td>\
            <td class="b_cen" check-value="ior_MN">{{if ior_MN}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_MN\', {{gid}})" title="和"><font>{{ior_MN | toFixed: 2}}</font></a>{{/if}}</td>\
            <td colspan="3" valign="top" class="b_cen"></td>\
            <td class="b_1st" check-value="ior_HMN">{{if ior_HMN}}<a href="javascript:;" onclick="order.bet(\'ft_rb_re\',\'ior_HMN\', {{gid}})" title="和">{{ior_HMN | toFixed: 2}}</a>{{/if}}</td>\
            <td colspan="2" valign="top" class="b_1st">&nbsp;</td>\
        </tr>'
    }, templateFt_Ft_F = {
        columnsNum: 11,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">主/主</th>\
            <th class="h_1x2">主/和</th>\
            <th class="h_1x2">主/客</th>\
            <th class="h_1x2">和/主</th>\
            <th class="h_1x2">和/和</th>\
            <th class="h_1x2">和/客</th>\
            <th class="h_1x2">客/主</th>\
            <th class="h_1x2">客/和</th>\
            <th class="h_1x2">客/客</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}"> \
            <td class="b_cen">\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen" check-value="ior_FHH">{{if ior_FHH}}<a title="主/主" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FHH\', {{gid}})"  >{{ior_FHH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FHN">{{if ior_FHN}}<a title="主/和" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FHN\', {{gid}})"  >{{ior_FHN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FHC">{{if ior_FHC}}<a title="主/客" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FHC\', {{gid}})"  >{{ior_FHC | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNH">{{if ior_FNH}}<a title="和/主" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FNH\', {{gid}})"  >{{ior_FNH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNN">{{if ior_FNN}}<a title="和/和" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FNN\', {{gid}})"  >{{ior_FNN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FNC">{{if ior_FNC}}<a title="和/客" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FNC\', {{gid}})"  >{{ior_FNC | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCH">{{if ior_FCH}}<a title="客/主" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FCH\', {{gid}})"  >{{ior_FCH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCN">{{if ior_FCN}}<a title="客/和" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FCN\', {{gid}})"  >{{ior_FCN | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_FCC">{{if ior_FCC}}<a title="客/客" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_f\',\'ior_FCC\', {{gid}})"  >{{ior_FCC | toFixed: 2}}</a>{{/if}}</td>\
        </tr>'
    }, templateFt_Ft_Pd = {
        columnsNum: 18,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">1:0</th>\
            <th class="h_1x2">2:0</th>\
            <th class="h_1x2">2:1</th>\
            <th class="h_1x2">3:0</th>\
            <th class="h_1x2">3:1</th>\
            <th class="h_1x2">3:2</th>\
            <th class="h_1x2">4:0</th>\
            <th class="h_1x2">4:1</th>\
            <th class="h_1x2">4:2</th>\
            <th class="h_1x2">4:3</th>\
            <th class="h_1x2">0:0</th>\
            <th class="h_1x2">1:1</th>\
            <th class="h_1x2">2:2</th>\
            <th class="h_1x2">3:3</th>\
            <th class="h_1x2">4:4</th>\
            <th class="h_1x2">其他</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}">\
            <td rowspan="2" class="b_cen">\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" rowspan="2" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H1C0">{{if ior_H1C0}}<a title="1:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H1C0\', {{gid}})"  >{{ior_H1C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H2C0">{{if ior_H2C0}}<a title="2:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H2C0\', {{gid}})"  >{{ior_H2C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H2C1">{{if ior_H2C1}}<a title="2:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H2C1\', {{gid}})"  >{{ior_H2C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C0">{{if ior_H3C0}}<a title="3:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H3C0\', {{gid}})"  >{{ior_H3C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C1">{{if ior_H3C1}}<a title="3:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H3C1\', {{gid}})"  >{{ior_H3C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H3C2">{{if ior_H3C2}}<a title="3:2" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H3C2\', {{gid}})"  >{{ior_H3C2}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C0">{{if ior_H4C0}}<a title="4:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H4C0\', {{gid}})"  >{{ior_H4C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C1">{{if ior_H4C1}}<a title="4:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H4C1\', {{gid}})"  >{{ior_H4C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C2">{{if ior_H4C2}}<a title="4:2" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H4C2\', {{gid}})"  >{{ior_H4C2}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_H4C3">{{if ior_H4C3}}<a title="4:3" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H4C3\', {{gid}})"  >{{ior_H4C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H0C0">{{if ior_H0C0}}<a  title="0:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H0C0\', {{gid}})">{{ior_H0C0}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H1C1">{{if ior_H1C1}}<a  title="1:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H1C1\', {{gid}})">{{ior_H1C1}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H2C2">{{if ior_H2C2}}<a  title="2:2" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H2C2\', {{gid}})">{{ior_H2C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H3C3">{{if ior_H3C3}}<a  title="3:3" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H3C3\', {{gid}})">{{ior_H3C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_H4C4">{{if ior_H4C4}}<a  title="4:4" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_H4C4\', {{gid}})">{{ior_H4C4}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_OVH">{{if ior_OVH}}<a  title="其他比分" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_pd\',\'ior_OVH\', {{gid}})">{{ior_OVH}}</a>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}">\
            <td class="b_cen" check-value="ior_H0C1">{{if ior_H0C1}}<a style=""  title="0:1" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H0C1\', {{gid}})">{{ior_H0C1}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C2">{{if ior_H0C2}}<a style=""  title="0:2" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H0C2\', {{gid}})">{{ior_H0C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C2">{{if ior_H1C2}}<a style=""  title="1:2" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H1C2\', {{gid}})">{{ior_H1C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C3">{{if ior_H0C3}}<a style=""  title="0:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H0C3\', {{gid}})">{{ior_H0C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C3">{{if ior_H1C3}}<a style=""  title="1:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H1C3\', {{gid}})">{{ior_H1C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H2C3">{{if ior_H2C3}}<a style=""  title="2:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H2C3\', {{gid}})">{{ior_H2C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H0C4">{{if ior_H0C4}}<a style=""  title="0:4" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H0C4\', {{gid}})">{{ior_H0C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H1C4">{{if ior_H1C4}}<a style=""  title="1:4" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H1C4\', {{gid}})">{{ior_H1C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H2C4">{{if ior_H2C4}}<a style=""  title="2:4" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H2C4\', {{gid}})">{{ior_H2C4}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_H3C4">{{if ior_H3C4}}<a style=""  title="3:4" href="javascript:void(0)" onclick="order.bet(\'ft_ft_pd\',\'ior_H3C4\', {{gid}})">{{ior_H3C4}}</a>{{/if}}</td>\
        </tr>'
    }, templateFt_Ft_P3 = {
        columnsNum: 9,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th nowrap="" class="time">时间</th>\
            <th nowrap="" class="team">赛事</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">全场 - 让球</th>\
            <th nowrap="" class="h_ou">全场 - 大小</th>\
            <th nowrap="" class="h_oe">单双</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">半场 - 让球</th>\
            <th nowrap="" class="h_ou">半场 - 大小</th>\
         </tr>',
        match: '<tr id="tr1_{{gid}}""> \
            <td rowspan="3" class="b_cen">\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td>\
            <td rowspan="2" class="team_name" >{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen borderTop" check-value="ior_MH">{{if ior_MH}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_MH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="" >{{ior_MH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}{{if strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_RH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_RH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_OUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="大">{{ior_OUH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_EOO\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="单">{{ior_EOO | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderTop" check-value="ior_HMH">{{if ior_HMH}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HMH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_HMH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HRH">{{if ior_HRH}}{{if hstrong}}<span class="con">{{hratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HRH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_h}}">{{ior_HRH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HOUH">{{if ior_HOUH}}<span class="con">大{{hratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HOUH\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="大">{{ior_HOUH | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}"" >\
            <td class="b_cen borderBottom" check-value="ior_MC">{{if ior_MC}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_MC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}" ><font>{{ior_MC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}{{if !strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_RC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}">{{ior_RC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_OUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="小">{{ior_OUC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_EOE\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="双">{{ior_EOE | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderBottom" check-value="ior_HMC">{{if ior_HMC}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HMC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}"><font>{{ior_HMC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HRC">{{if ior_HRC}}{{if !hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HRC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="{{team_c}}">{{ior_HRC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HOUC">{{if ior_HOUC}}<span class="con">小{{hratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HOUC\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="小">{{ior_HOUC | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr3_{{gid}}">\
            <td class="team_name" id="TR_11-1350180_1">和局</td>\
            <td class="b_cen" check-value="ior_MN">{{if ior_MN}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_MN\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="和"><font>{{ior_MN | toFixed: 2}}</font></a>{{/if}}</td>\
            <td colspan="3" valign="top" class="b_cen"></td>\
            <td class="b_1st" check-value="ior_HMN">{{if ior_HMN}}<a href="javascript:;" onclick="order.betChuan(\'ft_ft_p3\',\'ior_HMN\',{{gid}},\'{{team_h}}\',\'{{team_c}}\')" title="和">{{ior_HMN | toFixed: 2}}</a>{{/if}}</td>\
            <td colspan="2" valign="top" class="b_1st">&nbsp;</td>\
        </tr>\
        '
    }, templateFt_Ft_R = {
        columnsNum: 9,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th nowrap="" class="time">时间</th>\
            <th nowrap="" class="team">赛事</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">全场 - 让球</th>\
            <th nowrap="" class="h_ou">全场 - 大小</th>\
            <th nowrap="" class="h_oe">单双</th>\
            <th nowrap="" class="h_1x2">独赢</th>\
            <th nowrap="" class="h_r">半场 - 让球</th>\
            <th nowrap="" class="h_ou">半场 - 大小</th>\
         </tr>',
        match: '<tr id="tr1_{{gid}}""> \
            <td rowspan="3" class="b_cen">\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td>\
            <td rowspan="2" class="team_name" >{{team_h}}<br>{{team_c}}</td>\
            <td class="b_cen borderTop" check-value="ior_MH">{{if ior_MH}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_MH\',{{gid}})" title="" >{{ior_MH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_RH">{{if ior_RH}}{{if strong}}<span class="con">{{ratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_RH\',{{gid}})" title="{{team_h}}">{{ior_RH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderTop" check-value="ior_OUH">{{if ior_OUH}}<span class="con">大{{ratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_OUH\',{{gid}})" title="大">{{ior_OUH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderTop" check-value="ior_EOO">{{if ior_EOO}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_EOO\',{{gid}})" title="单">{{ior_EOO | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderTop" check-value="ior_HMH">{{if ior_HMH}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HMH\',{{gid}})" title="{{team_h}}">{{ior_HMH | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HRH">{{if ior_HRH}}{{if hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HRH\',{{gid}})" title="{{team_h}}">{{ior_HRH | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderTop" check-value="ior_HOUH">{{if ior_HOUH}}<span class="con">大{{hratio_o.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HOUH\',{{gid}})" title="大">{{ior_HOUH | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}"" >\
            <td class="b_cen borderBottom" check-value="ior_MC">{{if ior_MC}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_MC\',{{gid}})" title="{{team_c}}" ><font>{{ior_MC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_RC">{{if ior_RC}}{{if !strong}}<span class="con">{{ratio}}</span>{{/if}}<span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_RC\',{{gid}})" title="{{team_c}}">{{ior_RC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_rig borderBottom" check-value="ior_OUC">{{if ior_OUC}}<span class="con">小{{ratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_OUC\',{{gid}})" title="小">{{ior_OUC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_cen borderBottom" check-value="ior_EOE">{{if ior_EOE}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_EOE\',{{gid}})" title="双">{{ior_EOE | toFixed: 2}}</a>{{/if}}</td>\
            <td class="b_1st borderBottom" check-value="ior_HMC">{{if ior_HMC}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HMC\',{{gid}})" title="{{team_c}}"><font>{{ior_HMC | toFixed: 2}}</font></a>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HRC">{{if ior_HRC}}{{if !hstrong}}<span class="con">{{hratio}}</span>{{/if}} <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HRC\',{{gid}})" title="{{team_c}}">{{ior_HRC | toFixed: 2}}</a></span>{{/if}}</td>\
            <td class="b_1stR borderBottom" check-value="ior_HOUC">{{if ior_HOUC}}<span class="con">小{{hratio_u.substring(1)}}</span> <span class="ratio"><a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HOUC\',{{gid}})" title="小">{{ior_HOUC | toFixed: 2}}</a></span>{{/if}}</td>\
        </tr>\
        <tr id="tr3_{{gid}}"">\
            <td class="team_name" id="TR_11-1350180_1">和局</td>\
            <td class="b_cen"  check-value="ior_MN">{{if ior_MN}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_MN\',{{gid}})" title="和"><font>{{ior_MN | toFixed: 2}}</font></a>{{/if}}</td>\
            <td colspan="3" valign="top" class="b_cen"></td>\
            <td class="b_1st"  check-value="ior_HMN">{{if ior_HMN}}<a href="javascript:;" onclick="order.bet(\'ft_ft_r\',\'ior_HMN\',{{gid}})" title="和">{{ior_HMN | toFixed: 2}}</a>{{/if}}</td>\
            <td colspan="2" valign="top" class="b_1st">&nbsp;</td>\
        </tr>\
        '
    }, templateFt_Ft_T = {
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
                <th nowrap="" class="time">时间</th> \
                <th nowrap="" class="team">主客队</th> \
                <th nowrap="" class="h_1x2">0~1</th> \
                <th nowrap="" class="h_r">2~3</th> \
                <th nowrap="" class="h_ou">4~6</th> \
                <th nowrap="" class="h_oe">7或以上</th> \
            </tr>',
        match: '<tr id="tr1_{{gid}}"> \
                <td class="b_cen">\
                    {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                    {{if runningball}}<font color="red">滚球</font>{{/if}}\
                </td>\
                <td class="b_cen">{{team_h}}<br/>{{team_c}}</td>\
                <td class="b_cen" check-value="ior_T01">{{if ior_T01}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_ft_t\',\'ior_T01\',{{gid}})"  title="0~1"  >{{ior_T01 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_T23">{{if ior_T23}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_ft_t\',\'ior_T23\',{{gid}})"  title="2~3"  >{{ior_T23 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_T46">{{if ior_T46}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_ft_t\',\'ior_T46\',{{gid}})"  title="4~6"  >{{ior_T46 | toFixed: 2}}</a>{{/if}}</td>\
                <td class="b_cen" check-value="ior_OVER">{{if ior_OVER}}<a href="javascript:void(0)"  onclick="order.bet(\'ft_ft_t\',\'ior_OVER\',{{gid}})"  title="7+"  >{{ior_OVER | toFixed: 2}}</a>{{/if}}</td>\
            </tr>\
        '
    },templateFt_Ft_HPd = {
        columnsNum:13,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">1:0</th>\
            <th class="h_1x2">2:0</th>\
            <th class="h_1x2">2:1</th>\
            <th class="h_1x2">3:0</th>\
            <th class="h_1x2">3:1</th>\
            <th class="h_1x2">3:2</th>\
            <th class="h_1x2">0:0</th>\
            <th class="h_1x2">1:1</th>\
            <th class="h_1x2">2:2</th>\
            <th class="h_1x2">3:3</th>\
            <th class="h_1x2">其他</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}">\
            <td rowspan="2" class="b_cen">\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" rowspan="2" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
        	<td width="5%" class="b_cen" check-value="ior_HH1C0">{{if ior_HH1C0}}<a title="1:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH1C0\', {{gid}})"  >{{ior_HH1C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH2C0">{{if ior_HH2C0}}<a title="2:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH2C0\', {{gid}})"  >{{ior_HH2C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH2C1">{{if ior_HH2C1}}<a title="2:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH2C1\', {{gid}})"  >{{ior_HH2C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C0">{{if ior_HH3C0}}<a title="3:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH3C0\', {{gid}})"  >{{ior_HH3C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C1">{{if ior_HH3C1}}<a title="3:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH3C1\', {{gid}})"  >{{ior_HH3C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C2">{{if ior_HH3C2}}<a title="3:2" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH3C2\', {{gid}})"  >{{ior_HH3C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH0C0">{{if ior_HH0C0}}<a  title="0:0" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH0C0\', {{gid}})">{{ior_HH0C0}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH1C1">{{if ior_HH1C1}}<a  title="1:1" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH1C1\', {{gid}})">{{ior_HH1C1}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH2C2">{{if ior_HH2C2}}<a  title="2:2" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH2C2\', {{gid}})">{{ior_HH2C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH3C3">{{if ior_HH3C3}}<a  title="3:3" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HH3C3\', {{gid}})">{{ior_HH3C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HOVH">{{if ior_HOVH}}<a  title="其他比分" href="javascript:void(0)"  onclick="order.bet(\'ft_ft_hpd\',\'ior_HOVH\', {{gid}})">{{ior_HOVH}}</a>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}">\
            <td class="b_cen" check-value="ior_HH0C1">{{if ior_HH0C1}}<a style=""  title="0:1" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH0C1\', {{gid}})">{{ior_HH0C1}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH0C2">{{if ior_HH0C2}}<a style=""  title="0:2" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH0C2\', {{gid}})">{{ior_HH0C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH1C2">{{if ior_HH1C2}}<a style=""  title="1:2" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH1C2\', {{gid}})">{{ior_HH1C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH0C3">{{if ior_HH0C3}}<a style=""  title="0:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH0C3\', {{gid}})">{{ior_HH0C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH1C3">{{if ior_HH1C3}}<a style=""  title="1:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH1C3\', {{gid}})">{{ior_HH1C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH2C3">{{if ior_HH2C3}}<a style=""  title="2:3" href="javascript:void(0)" onclick="order.bet(\'ft_ft_hpd\',\'ior_HH2C3\', {{gid}})">{{ior_HH2C3}}</a>{{/if}}</td>\
        </tr>'
    },templateFt_Fu_HPd = {
        columnsNum:13,
        title: '<table cellpadding="0" cellspacing="0" border="0" class="game"><tr> \
            <th class="time">时间</th> \
            <th style="width:120px;" class="time">主客队伍</th> \
            <th class="h_1x2">1:0</th>\
            <th class="h_1x2">2:0</th>\
            <th class="h_1x2">2:1</th>\
            <th class="h_1x2">3:0</th>\
            <th class="h_1x2">3:1</th>\
            <th class="h_1x2">3:2</th>\
            <th class="h_1x2">0:0</th>\
            <th class="h_1x2">1:1</th>\
            <th class="h_1x2">2:2</th>\
            <th class="h_1x2">3:3</th>\
            <th class="h_1x2">其他</th>\
        </tr>',
        match: '<tr id="tr1_{{gid}}">\
            <td rowspan="2" class="b_cen">\
                {{datetime | dateFormat:\'MM-dd\'}}<br/>\
                {{datetime | dateFormat:\'hh:mm\'}}<br/>\
                {{if runningball}}<font color="red">滚球</font>{{/if}}\
            </td> \
            <td width="13%" rowspan="2" class="b_cen">{{team_h}}<br>{{team_c}}</td>\
            <<td width="5%" class="b_cen" check-value="ior_HH1C0">{{if ior_HH1C0}}<a title="1:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH1C0\', {{gid}})"  >{{ior_HH1C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH2C0">{{if ior_HH2C0}}<a title="2:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH2C0\', {{gid}})"  >{{ior_HH2C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH2C1">{{if ior_HH2C1}}<a title="2:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH2C1\', {{gid}})"  >{{ior_HH2C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C0">{{if ior_HH3C0}}<a title="3:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH3C0\', {{gid}})"  >{{ior_HH3C0}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C1">{{if ior_HH3C1}}<a title="3:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH3C1\', {{gid}})"  >{{ior_HH3C1}}</a>{{/if}}</td>\
            <td width="5%" class="b_cen" check-value="ior_HH3C2">{{if ior_HH3C2}}<a title="3:2" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH3C2\', {{gid}})"  >{{ior_HH3C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH0C0">{{if ior_HH0C0}}<a  title="0:0" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH0C0\', {{gid}})">{{ior_HH0C0}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH1C1">{{if ior_HH1C1}}<a  title="1:1" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH1C1\', {{gid}})">{{ior_HH1C1}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH2C2">{{if ior_HH2C2}}<a  title="2:2" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH2C2\', {{gid}})">{{ior_HH2C2}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HH3C3">{{if ior_HH3C3}}<a  title="3:3" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HH3C3\', {{gid}})">{{ior_HH3C3}}</a>{{/if}}</td>\
            <td width="5%" rowspan="2" class="b_cen" check-value="ior_HOVH">{{if ior_HOVH}}<a  title="其他比分" href="javascript:void(0)"  onclick="order.bet(\'ft_fu_hpd\',\'ior_HOVH\', {{gid}})">{{ior_HOVH}}</a>{{/if}}</td>\
        </tr>\
        <tr id="tr2_{{gid}}">\
        	<td class="b_cen" check-value="ior_HH0C1">{{if ior_HH0C1}}<a style=""  title="0:1" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH0C1\', {{gid}})">{{ior_HH0C1}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH0C2">{{if ior_HH0C2}}<a style=""  title="0:2" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH0C2\', {{gid}})">{{ior_HH0C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH1C2">{{if ior_HH1C2}}<a style=""  title="1:2" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH1C2\', {{gid}})">{{ior_HH1C2}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH0C3">{{if ior_HH0C3}}<a style=""  title="0:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH0C3\', {{gid}})">{{ior_HH0C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH1C3">{{if ior_HH1C3}}<a style=""  title="1:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH1C3\', {{gid}})">{{ior_HH1C3}}</a>{{/if}}</td>\
            <td class="b_cen" check-value="ior_HH2C3">{{if ior_HH2C3}}<a style=""  title="2:3" href="javascript:void(0)" onclick="order.bet(\'ft_fu_hpd\',\'ior_HH2C3\', {{gid}})">{{ior_HH2C3}}</a>{{/if}}</td>\
        </tr>'
    }

        getTableName = function (type) {
        switch (type) {
            case 'ft_ft_t':
            case 'ft_ft_r':
            case 'ft_ft_f':
            case 'ft_ft_pd':
            case 'ft_ft_hpd':
            case 'ft_ft_p3':
                return '今日足球';
            case 'ft_fu_t':
            case 'ft_fu_r':
            case 'ft_fu_f':
            case 'ft_fu_pd':
            case 'ft_fu_hpd':
            case 'ft_fu_p3':
                return '早盘足球';
            case 'ft_rb_re':
                return '足球 : 滚球'
            default:
                return ''
        }
    }
    return {
        getTemplateData: getTemplateData,
        getTableName: getTableName
    }
}()