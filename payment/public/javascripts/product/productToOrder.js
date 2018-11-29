const TestTypeDefine = require('../../../../../lbConf/sharedApp/global/testTypeDefine');
const sharedUtils = require('../../../../../lbConf/publicRes/jsUtils/langbo/sharedUtils');
const insideDefine = require('../../../../defines/inside/insideDefine');
const alert = require('../../../../../lbConf/publicRes/jsUtils/langbo/alert');

const purchaseMgr = {
    newNumber: 0,
    testTypeTExt: 0,
    newData: [],
    initPage: () => {
        purchaseMgr.initPageCtrls();
        purchaseMgr.initPageEvent();
    },
    initPageCtrls: () => {
        // 页面初始化
        $('.j-price-num span').text(0).hide();
        $('.j-price-num p b').text(0);
        $('.j-price-num i').hide();
        $('.j-dl-input input').val('');

        purchaseMgr.getproductCombos($('.j-TestTyeForm button').eq(0));
    },
    initPageEvent: () => {
        $('.j-nav-tab').on('click', 'button', (e) => {
            $('.j-dl-span span').removeClass('spanchecked');
            $('.j-list-text b').addClass('activeTop').removeClass('activeDown');
            $('.j-price-num span').text('');
            $('.j-price-num p b').text('');
            $('.j-dl-input input').val('');
            $('.j-price-num span').text(0).hide();
            $('.j-price-num p b').text(0);
            $('.j-price-num i').hide();
            purchaseMgr.getproductCombos($(e.target));
        });
        purchaseMgr.initPageDataClick();
        purchaseMgr.initPageControl();
        $('.navbar-footer').hide();
        // 点击确定订单
        $('.j-price-button').on('click', () => {
            const productInfo = {
                testType: $('.j-TestTyeForm .u-tab-checked').attr('data-usr-test'),
                OrderType: insideDefine.OrderType.productActivate,
                ProductId: '',
                ProductName: '',
                CourseDuration: '',
                ProductTest: '',
                ProductPrice: '',
                ProductActualPrice: ''
            };
            if ($('.j-list-height').css('display') === 'none') {
                if ($('.j-table-tr').children('.checked').length === 0) {
                    alert.Alert({
                        title: '提示',
                        content: '请选择产品组合'
                    });
                    return;
                }
                productInfo.OrderType = insideDefine.OrderType.productActivate;
                productInfo.ProductId = $('.j-content-table .checked').eq(0).attr('data-product-Id');
                productInfo.ProductName = $('.j-content-table .checked').eq(0).text().trim();
                productInfo.CourseDuration = $('.j-content-table .checked').eq(1).attr('data-time-length');
                productInfo.ProductTest = $('.j-content-table .checked').eq(3).text().trim();
                productInfo.ProductPrice = $('.j-content-table .checked').eq(5).text().trim();
                productInfo.ProductActualPrice = $('.j-price-num p b').text().trim();
            } else {
                // 已开通服务，自定义 - 续费（默认）
                productInfo.ProductName = $('.j-dl-span').children('[data-product-only=true]').attr('data-product-productName');
                productInfo.ProductTest = '';
                productInfo.OrderType = insideDefine.OrderType.productRenew;
                productInfo.ProductId = $('.j-dl-span').children('[data-product-only=true]').attr('data-product-Id');
                // 未开通服务，自定义购买 - 系统服务
                if ($('.j-dl-span').css('display') !== 'none') {
                    if ($('.j-dl-span').children('.spanchecked').length === 0) {
                        alert.Alert({
                            title: '提示',
                            content: '请选择系统服务'
                        });
                        return;
                    }
                    productInfo.ProductName = $('.j-dl-span').children('.spanchecked').attr('data-product-productName');
                    productInfo.ProductTest = $('.j-dl-span').children('.spanchecked').text().trim();
                    productInfo.OrderType = insideDefine.OrderType.productActivate;
                    productInfo.ProductId = $('.j-dl-span').children('.spanchecked').attr('data-product-Id');
                }
                const $val = $('.j-dl-input input').val();
                const regHour = $val.toString().substr($val.length - 1);
                if ($('.j-dl-input input').val() === '' || parseFloat($('.j-dl-input input').val()) === 0 || regHour === '.') {
                    alert.Alert({
                        title: '提示',
                        content: '请输入课程时长'
                    });
                    return;
                }
                productInfo.CourseDuration = $('.j-dl-input input').val();
                productInfo.ProductPrice = $('.j-price-num span').text().trim();
                productInfo.ProductActualPrice = $('.j-price-num p b').text().trim();
            }
            if ($('.j-checkbox label').css('display') === 'none' && !$('#checked').is(':checked')) {
                alert.Alert({
                    title: '提示',
                    content: '下单前请阅读服务协议并勾选同意'
                });
                return;
            }
            $.ajax({
                type: 'POST',
                url: '/product/productToOrder/ajax/placeAnOrder',
                data: JSON.stringify(productInfo),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: res => {
                    if (res && res.status === 0) {
                        window.location = '/order/payment';
                    }
                },
                error: err => {
                    alert.Alert({
                        title: '错误',
                        content: err.Message
                    });
                }
            });
        });
    },
    initPageDataClick: () => {
        // 鼠标划入 划出
        $('.j-nav-tab button').on('mouseenter', (e) => {
            $(e.target).addClass('pHover').siblings().removeClass('pHover');
        });
        $('.j-nav-tab button').on('mouseleave', (e) => {
            $(e.target).removeClass('pHover');
        });
        //
        $('.j-dialog').hide();
        $('.j-protocol-first').on('click', () => {
            $('.j-dialog').show();
            $('.dialog-modal-header').html('朗播用户协议');
            const text = `<h4>特别提示</h4>
<p>1.	北京博智天下信息技术有限公司（以下简称“公司”）同意对其开发的朗播官网（www.langlib.com）及在全国设立的“朗播英语智能学习实验室”（以下合称“朗播”）按照本协议规定及其不时发布的操作规则提供基于互联网以及移动网的相关服务（以下称“朗播网络服务”）和基于朗播网络服务的线下学习辅助服务（以下称“朗播学习辅助服务”，与“朗播网络服务”合称“朗播服务”）。为获得朗播服务，服务使用人（以下称 “用户”）应当同意本服务条款的全部内容并按照页面上的提示完成全部的注册程序及手机号码绑定程序。用户在进行注册程序过程或手机号码绑定程序中选中“我已阅读并同意《朗播用户协议》”并点击“创建账号”或“确定绑定”按钮即表示用户完全接受本条款项下的全部内容；如果没有选择“我已阅读并同意《朗播用户协议》”，则视为不接受本协议全部条款，申请人应当终止并退出注册或绑定流程。</p>
<p>2.	用户必须是具备完全民事行为能力的自然人。无民事行为能力人、限制民事行为能力人不应注册为朗播用户，其与朗播之间的用户协议自始无效，朗播一经发现，有权立即注销该用户，并保留追究其使用朗播服务的一切法律责任的权利。用户注册是指用户访问朗播平台，并按要求填写相关信息并确认同意履行相关用户协议的过程。用户因与朗播进行交易，获取朗播服务或接触朗播平台服务器而发生的所有应纳税赋，以及一切硬件、软件、服务及其它方面的费用均由用户自行支付。本协议阐述之条款和条件适用于全部朗播服务，包括但不限于各种课程视频、学习内容、资料及其他相应服务。</p>
<br />
<h4>服务内容</h4>
<p>1.	朗播网络服务的具体内容由朗播根据实际情况提供，具体内容包括但不限于词汇产品、方法课、陪练课、智能训练计划、模考产品、学习社区、公开课等。</p>
<p>2.	朗播的部分网络服务（包括但不限于词汇产品、方法课、陪练课、智能训练计划、模考产品、学习社区、公开课等）为收费的网络服务，用户在使用朗播收费网络服务时需要向朗播支付一定的费用。对于收费的网络服务，朗播会在用户使用之前给予用户明确的提示，只有用户根据提示确认支付相关费用后，才能使用相关收费网络服务。如用户拒绝支付相关费用，用户则无权使用收费网络服务。</p>
<p>3.	用户理解，朗播网络服务仅包含在线学习服务，用户应自行承担其使用网络服务时需购买的设备费用（包括但不限于个人电脑、手机、及其他与接入互联网或移动网有关的装置）与网络费用（包括但不限于为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）。</p>
<p>4.	朗播学习辅助服务的具体内容由朗播、朗播Inside合作学校及朗播英语智能学习实验室的城市合伙人根据实际情况提供，具体内容包括但不限于学习规划、答疑、辅导等。</p>
<br />
<h4>服务变更、中断或终止</h4>
<p>1.	鉴于朗播服务的特殊性，朗播有权随时变更、中断或终止部分或全部的服务（包括收费网络服务和收费学习辅助服务）。如变更、中断或终止的服务属于免费服务，朗播无需通知用户，也无需对任何用户或任何第三方承担任何责任；如变更、中断或终止的服务属于收费服务，朗播应当在变更、中断或终止之前通知用户，并向受影响的用户提供等值的替代性收费服务。尽管如此，朗播对提供的替代性收费服务的方式和内容有绝对的决定权。 </P>
<p>2.	用户理解，朗播需要定期或不定期地对提供朗播服务的平台（包括但不限于互联网网站、移动网络等）或相关设备或线下学习场地进行检修或者维护，如因此类情况而造成朗播服务在合理时间内被中断，朗播无需为此承担任何责任，但朗播应尽可能事先向用户进行通告。</p>
<p>3.	如发生下列任何一种情形，朗播有权随时终止向用户提供本协议项下的任何朗播服务，并无需对用户或任何第三方承担任何责任：</p>
<p>3.1 用户提供的个人资料不真实；</p>
<p>3.2 用户在使用朗播服务中违反国家法律、法规或侵犯第三方合法权益；</p>
<p>3.3 用户对朗播服务产品进行破坏性操作，包括但不限于网络攻击、软件破坏、窃取或反编译源代码等；</p>
<p>3.4 用户违反本协议中规定的使用规则；</p>
<p>3.5 用户在使用朗播的收费服务时未按规定向朗播支付相应费用；</p>
<p>3.6 转让本人账户、盗用他人账户、利用朗播采取不正当手段谋利等行为。</p>
<p>4.	朗播有权根据实际情况调整产品的形式或内容。在产品升级改版之后，朗播有权决定是否继续支持或维护旧版本的数据和服务。在用户购买的服务过期后，朗播有权决定是否继续保留该用户在服务有限期内产生的学习数据和内容。</p>
<p>5.	如用户在任何连续 180 日内（含）未实际使用其注册的免费网络服务帐号，或者用户在其订购的收费朗播网络服务的服务期满之后连续 180 日内（含）未实际使用其注册的收费网络服务帐号，则朗播有权删除该帐号并停止为该用户提供相关的网络服务。</p>
<br /><h4>使用规则</h4>
<p>1.	用户在申请使用朗播服务时，必须向朗播提供准确的个人资料，如个人资料有任何变动，用户必须及时进行更新。</p>
<p>2.	用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知朗播。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，朗播不承担任何责任。</p>
<p>3.	朗播有权在提供服务过程中以各种方式向用户投放各种商业性广告或其他任何类型的商业信息；并且，用户同意接受朗播通过电子邮件、手机短信等其他方式向用户发送商品促销或其他相关商业信息的行为。</p>
<p>4.	注册用户在使用朗播服务时，应承诺接受并遵守以下各项相关规则：</p>
<p>4.1 遵守所有使用朗播服务的网络协议、规定、程序和惯例；</p>
<p>4.2 不得使用朗播从事违法活动；</p>
<p>4.3 不得干扰朗播的正常运行或侵犯其他用户正常使用网络服务的权利；</p>
<p>4.4 未经允许，不得以任何形式下载或试图下载朗播平台上公布的任何内容；</p>
<p>4.5 用户购买的课程只供该用户学习使用，不得用于其他目的；</p>
<p>4.6 从中国境内向境外传输技术性资料时不得违反中国有关法律及法规规定。</p>
<p>5.	同时用户需承诺：</p>
<p>5.1 不得利用朗播网络教育平台制作、复制、查阅和传播下列信息： 任何非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽的、歧视性的信息资料； 任何教唆他人进行违法犯罪的资料； 不利于民族团结、国家安全和社会安定的资料； 任何不符合国家法律和法规规定的资料、信息； 任何捏造或者歪曲事实、散布谣言、扰乱社会秩序的信息； 损害朗播声誉和商业利益的信息；</p>
<p>5.2 不得未经许可非法进入其它个人或组织电脑系统；</p>
<p>5.3 未经允许不得对朗播网络教育平台中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</p>
<p>5.4 不得故意制作和传播计算机病毒等破坏性程序；</p>
<p>5.5 严格履行法律规定的其他义务。</p>
<p>如果用户的行为违背上述规定，朗播可以做出独立判断并有权立即中断为该用户提供服务；如果用户行为违反上述规定，或者违反相关法律法规的，或者侵犯任何第三方的合法权益，用户应对自己的违法行为承担全部法律责任。如因此给朗播造成任何损失或不得影响，用户应负责消除影响，并且赔偿朗播因此遭受的一切损失，包括且不限于经济损害赔偿、名誉损害赔偿、以及律师费、交通费等因维权而产生的合理费用。</p>
<p>6.	基于网络服务的特殊性，用户同意：</p>
<p>6.1 在注册时依照提示提供准确用户名和密码以及详尽的个人资料。</p>
<p>6.2 在个人的注册信息发生变化时，用户应及时更新自己的注册信息，保证其个人资料的详尽和准确。所有用户输入的个人信息将被视作用户身份的准确表明，并作为朗播提供所有服务的有效身份依据。</p>
<p>6.3 用户需自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置。</p>
<p>6.4 用户一旦注册成功，成为朗播服务的正式用户后，应当对自己的用户名（亦称帐号）、密码的安全性负全部责任。用户的密码只能由用户自己掌握。</p>
<p>6.5 对于用户因帐号或密码泄露造成的各种损失，朗播不承担任何责任。用户若发现任何非法使用个人帐号的情况，应立即通知朗播。</p>
<p>6.6 用户应对以其用户名进行的所有活动和事件负责。</p>
<p>6.7 一个听课帐号只能由一个用户使用，不允许多个用户使用同一个听课帐号；如果用户违反此规定，朗播有权将此听课帐号做封号处理并保留追究其法律责任的权利。</p>
<p>6.8 用户应使用正版课程资料，对于该用户涉嫌盗版贩卖听课账号等行为，一经证实，朗播有权将此听课账号做封号处理并保留追究其法律责任的权利。</p>
<p>6.9 朗播有权对用户使用朗播的情况进行审查和监督(包括但不限于对用户存储在朗播的内容进行审核)。如用户在使用朗播时违反本协议下的规定，朗播或其授权的人有权要求用户纠正其不当行为或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</p>
<p>6.10 朗播通过各种方式（包括但不限于公告、电子邮件、短信提醒等）针对服务使用方法作出的任何声明、通知、警示等均视为本协议的一部分；用户使用朗播服务，被视为用户同意该声明、通知、警示等。</p>
<p>6.11 为防止用户恶意使用朗播产品，朗播有权对其提供的服务设置使用数量上限，包括但不限于：评测次数、训练数量等。</p>
<br /><h4>知识产权</h4>
<p>1.	朗播提供的服务中包含的任何文本、图片、音频或视频资料均受版权、商标或其它与财产所有权相关的法律的保护。未经相关权利人同意，上述资料均不得在任何媒体上直接或间接发布、播放，或出于播放或发布的目的而改写、再发行，或者被用于其他任何商业目的。所有上述资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机上。对于在传送或递交全部或部分上述资料过程中产生的延误、不准确和遗漏及由此产生的任何损害，朗播不以任何形式向用户或任何第三方负责。</p>
<p>2.	朗播因提供网络服务而使用任何软件（包括但不限于软件中所含的任何图象、照片、动画、录像、录音、音乐、文字和附加程序、随附的帮助材料等）的一切权利均属于该软件的著作权人。未经该软件的著作权人许可，用户不得对该软件进行反向工程（reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</p>
<p>3.	注册用户确认其对在朗播购买的服务及内容仅享有使用权，并不对该内容拥有任何知识产权。未经朗播或其他有权第三方的许可，用户不得对包括视频、学习软件、学习资料、音频内容等在内的任何内容进行翻录、复制、发行、破解、信息网络传播或其他违反知识产权相关法律、法规的行为，否则所导致的一切民事、行政或刑事责任，由用户自行承担。</p>
<p>4.	对于用户在朗播网络服务中所下载的任何标有“朗播所有”的资料，注册用户只得根据具体的使用协议进行使用，并不拥有对该产品及产品中任何内容的知识产权。除非经朗播的书面许可，注册用户不得自行或授权他人对资料或其中的任何一部分进行复制、反编译、倒序制造、反汇编、试图推导源代码、破译、修改或创作衍生作品，因此而造成对朗播或任何第三方的损失，由用户承担全部责任。朗播对上述侵权或违约行为保留追究其法律责任的权利。</p>
<p>5.	对于注册用户在朗播提交的所有学习数据（包括并不限于用户提交问题、发布的文章、笔记、练习题目的用户答案等），朗播对此内容享有复制、发行及独家出版的权利。</p>
<p>6.	注册用户应对其账号的全部使用行为承担责任；注册用户应严格遵守本协议相关规定、账号及课程使用规定和相关法律法规。</p>
<p>7.	未经朗播许可，用户不可向任何第三方除用户自我学习之外的目的提供任何朗播服务内容或资料。</p>
<p>8.	朗播的所有服务均附期限，用户应在截止日期前享受其购买的服务。因服务有效期到期终止所导致的任何后果，朗播不承担任何责任。</p>
<br /><h4>隐私保护</h4>
<p>1.	保护用户隐私是朗播的基本责任。朗播保证不对外公开或向第三方提供任何用户的注册资料及用户在使用网络服务时存储在朗播的非公开内容，但下列情况除外：</p>
<p>1.1 事先获得用户的明确授权；</p>
<p>1.2 根据有关法律法规要求;</p>
<p>1.3 按照相关政府主管部门的要求；</p>
<p>1.4 为维护社会公众的利益；</p>
<p>1.5 为维护朗播的合法权益。</p>
<p>2.	朗播可能会与第三方合作向用户提供相关的网络服务。在此情况下，如该第三方同意承担与朗播同等的保护用户隐私的责任，则朗播有权将用户的注册资料等提供给该第三方。</p>
<p>3.	在不透露任何用户隐私资料的前提下，朗播有权对整个用户的数据库进行分析并对用户数据库进行商业上的利用。</p>
<h5>免责声明</h5>
<p>1.	用户明确同意其使用朗播服务所存在的任何风险将自行承担；因其使用朗播服务而产生的一切后果也自行承担，朗播对用户不承担任何责任。</p>
<p>2.	除了本协议中另有说明，朗播不承诺其提供的服务一定能满足用户的要求，也不担保朗播的服务不会中断；朗播对服务内容的实效性、安全性、准确性也都不作承诺。</p>
<p>3.	朗播不保证其为方便用户而提供的外部链接的准确性和完整性；同时，对于外部链接指向的不由朗播实际控制的任何网页上的内容，朗播不承担任何责任。</p>
<p>4.	对于因不可抗力或朗播不能控制的原因造成的朗播服务暂停、中断或其它缺陷，朗播不承担任何责任，但应尽力减少因此而给用户造成的损失和影响。</p>
<p>5.	当用户所享有的服务中显示其他第三方网站或内容时，由于朗播无法控制及审核该网站或内容，因此朗播不对该网站或内容的真实性、有效性、合法性等效力承担责任。对于用户因使用或信赖该网站或内容所导致的任何直接或间接损失，朗播均不承担责任。</p>
<p>6.	由于用户将个人注册账号信息告知他人或与他人共享注册帐号而导致的任何风险或损失，或因其他任何非朗播原因导致账号或密码泄露，朗播对此不负任何责任。</p>
<p>7.	对于因黑客攻击、计算机病毒侵入或发作、政府管制、硬件故障、不可抗力等非朗播故意或严重过失而造成的用户个人资料泄露、丢失、被盗用、被篡改或服务暂停或终止，以及由此对注册用户所造成的风险或损失，朗播均得免责。</p>
<p>8.	朗播有权根据用户的实际需求对服务进行调整，由此造成的一切不便与损失，朗播均得免责。</p>
<p>9.	对于下列朗播向用户提供的产品或者服务，朗播无需对其质量缺陷本身及引发的任何损失承担任何责任：</p>
<p>9.1 朗播向用户免费提供的各项朗播服务。</p>
<p>9.2 朗播向用户赠送的任何产品或者服务。</p>
<br /><h4>违约赔偿</h4>
<p>1.	如因朗播违反有关法律、法规或本协议项下的任何条款而给用户造成损失，朗播同意承担由此造成的直接的损害赔偿责任；但无论如何，赔偿额不超过朗播收取的该用户的所有费用。</p>
<p>2.	用户同意保障和维护朗播其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给朗播或任何其他第三方造成损失，用户同意承担由此造成的损害赔偿责任。</p>
<br /><h4>协议修改</h4>
<p>1.	朗播有权随时修改本协议的任何条款。一旦本协议的内容发生变动，朗播将直接在官网上公布修改之后的协议内容，该公布行为被视为朗播已经通知用户修改内容。朗播也可通过其他适当方式向用户提示修改内容。</p>
<p>2.	如不同意朗播对本协议相关条款所做的修改，用户有权停止使用朗播服务。如果用户继续使用朗播服务，该行为被视为用户接受朗播对本协议相关条款所做的修改。</p>
<br /><h4>通知送达</h4>
<p>1.	本协议项下朗播均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行用户通知；该等通知于发送之日起被视为已送达收件人。</p>
<p>2.	用户应当通过朗播对外正式公布的通信地址、传真号码和电子邮件地址等信息与朗播进行必要联系。</p>
<br /><h4>法律管辖</h4>
<p>1.	本协议的订立、执行、解释及争议的解决均应适用中国法律。</p>
<p>2.	双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，朗播所在地的人民法院有排他性的管辖权。</p>
<br /><h4>其他规定</h4>
<p>1.	本协议构成双方对本协议之约定事项的全部协议。</p>
<p>2.	如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
<p>3.	本协议中的标题仅为方便而设，不影响对条款内容的解释。</p>
<br /><h4>解释权</h4>
<p>1.	上述条款的解释权在法律允许的范围内归朗播所有。</p>
`;
            $('.dialog-modal-content').html(text);
        });
        $('.j-protocol-last').on('click', () => {
            $('.j-dialog').show();
            $('.dialog-modal-header').html('朗播产品购买及使用协议');
            const text = `<h4>特别提示</h4>
<p>为了维护用户的正当权益和保障朗播业务的顺利开展，朗播对退费情况规定如下：依照《朗播用户协议》约定，用户需要对已购买课程及服务（包括通过网上支付、银行电汇等各种购买方式购买的课程及服务）办理退费时，需按照如下条款执行，本协议下的条款是《朗播用户协议》下的一部分：</p>
<br /><h4>出国考试类产品（托福、雅思、SAT、GRE、GMAT、ACT）</h4>
<p>1.	直播（指方法课）类套餐：</p>
<p>1.1 退款条件：自购买之日起，截止到方法课开课后 10 小时内（含）可无条件申请退款；超过 10 小时，不再接受任何用户因个人原因导致的退款申请。</p>
<p>1.2 退款方式：方法课部分全额退款；智能训练计划或在线练习计划部分和陪练课（如有），按照从购买之日起到申请退款当天的天数，根据有效期按比例折算，扣除相应费用后，将余额全部退还。
例如：智能训练计划 2399 元，有效期 365 天，若某月 1 日购买，当月 4 日申请退款，则自购买之日至申请退款日天数计为 4 - 1 = 3 天， 即退款费用 =2399- 2399/365 × 3 = 2379 元。</p>
<p>1.3 退款时间及路径：学员提交退款申请，经朗播审核无误后，费用将于 3 个工作日内退回原支付账户。</p>
<p>2.	录播（指方法课）套餐：</p>
<p>2.1 退款条件：自购买之日起 3 日内无条件申请退款；超过 3 日，不再接受任何用户因个人原因导致的退款申请。</p>
<p>2.2 退款方式：方法课部分全额退款；智能训练计划或在线练习计划部分和陪练课（如有），按照从购买之日起到申请退款当天的天数，根据有效期按比例折算，扣除相应费用后，将余额全部退还。</p>
<p>例如：智能训练计划 2399 元，有效期 365 天，若某月 1 日购买，当月 4 日申请退款，则自购买之日至申请退款日天数计为 4 - 1 = 3 天， 即退款费用 =2399- 2399/365 × 3 = 2379 元。</p>
<p>2.3 退款时间及路径：学员提交退款申请，经朗播审核无误后，费用将于 3 个工作日内退回原支付账户。</p>
<br /><h4>国内考试类课程（四级、六级、高考英语）及实用英语课程</h4>
<p>1.	退款条件：</p>
<p>1.1 四级、六级、高考英语课程自购买之日起 2 日内无条件申请退款；超过 2日，不再接受任何用户因个人原因导致的退款申请。</p>
<p>1.2 实用英语课程自购买之日起，到开课后 2 日内无条件申请退款；在开课后 2 日之后，不再接受任何用户因个人原因导致的退款申请。</p>
<p>2.	退款方式：符合上述退款条件的退款申请，审核无误后将给予全额退款。</p>
<p>3.	退款时间及路径：学员提交退款申请，经朗播审核无误后，费用将于 3 个工作日内退回原支付账户。</p>
<br /><h4>朗播英语智能学习实验室课程及服务</h4>
<p>1.	朗播英语智能学习实验室的课程及服务包含录播套餐及线下的学习辅助服务，二者需同时购买并使用。申请录播套餐退款，需同时申请学习辅助服务退款；但申请学习辅助服务退款的，可选择继续使用录播套餐。</p>
<p>2.	录播（指方法课）套餐：</p>
<p>2.1 退款条件：自购买之日起 3 日内无条件申请退款；超过 3 日，不再接受任何用户因个人原因导致的退款申请。</p>
<p>2.2 退款方式：方法课部分全额退款；智能训练计划或在线练习计划部分和陪练课（如有），按照从购买之日起到申请退款当天的天数，根据有效期按比例折算，扣除相应费用后，将余额全部退还。</p>
<p>例如：智能训练计划 2399 元，有效期 365 天，若某月 1 日购买，当月 4 日申请退款，则自购买之日至申请退款日天数计为 4 - 1 = 3 天， 即退款费用 =2399- 2399/365 × 3 = 2379 元。</p>
<p>2.3 退款时间及路径：学员提交退款申请，经朗播审核无误后，费用将于 3 个工作日内退回原支付账户。</p>
<p>3.	学习辅助服务：</p>
<p>3.1 退款条件：未消耗课时的对应的课时学费，自购买之日起支持无条件申请退款；已消耗课时对应的课时学费，不再接受任何用户因个人原因导致的退款申请。</p>
<p>3.2 退款方式：未消耗课时的学费全额退款。</p>
<p>3.3 退款时间及路径：学员提交退款申请，经朗播审核无误后，费用将于 3 个工作日内退回原支付账户。</p>
<br /><h4>关于开具发票的细则</h4>
<p>1.	开具时间：</p>
<p>1.1 网络课程：用户可在购买网络课程之日起30日内申请开具发票。</p>
<p>1.2 学习辅助服务：用户可在结束课程服务的30日内申请开具已消耗课时对应的课时学费的发票。</p>
<p>2.	具体要求：</p>
<p>2.1 增值税专用发票：用户付款方必须为公司账户，转账至北京博智天下信息技术有限公司银行账户，且单位名称和付款账户一致方可开具增值税专用发票。用户需提供单位名称、纳税人识别号、地址、电话、开户行及账号等信息，由朗播确认收款后开具相应金额发票。</p>
<p>2.2 增值税普通发票：用户提供发票抬头信息，由朗播确认收款后开具相应金额发票。</p>
<p>3.	发票使用普通快递寄送，快递费用由用户承担。</p>
<p>4.	发票内容：英语课程费。</p>
<p>关于延长产品使用期限的说明</p>
<p>1.	朗播提供的所有课程和产品服务中，只有出国考试类产品提供延长使用期限的服务。</p>
<p>2.	智能训练计划（在线练习计划）有效期为一年，过期后按照 200 元／月延长使用期限，且延长期限累计不能超过 3 个月。若延长期限累计超过 3 个月，继续使用需要重新购买套餐。</p>
<p>3.	直播方法课不提供延长使用期限的服务。</p>
<p>4.	支付方式：学员向朗播官方淘宝店或实验室客服提交申请，客服根据学员需要延长的产品类型及期限提供差价链接，用户完成差价支付后，即可延长相应的产品使用期限。</p>
<br /><h4>关于直播录播方法课转换的说明</h4>
<p>1.	选择直播方法课（仅针对出国考试类套餐）的用户，可于直播方法课开课后的 3 日内提出转换为录播方法课的申请；超过 3 日，不再接受转换申请。</p>
<p>2.	选择录播方法课（仅针对出国考试类套餐）的用户，可于录播方法课购买后的 5 日内提出转换为直播方法课的申请，超过 5 日，不再接受转换申请。</p>
<p>3.	朗播英语智能学习实验室内的方法课仅指录播套餐，且不支持录播转换直播的申请。</p>
<br /><h4>关于优惠券的使用说明</h4>
<p>1.	用户购买任意课程或产品时，若账户中有超过一张优惠券，仅限使用一张，系统默认选择面额最大的优惠券优先使用。</p>
<p>2.	用户申请退款时，按照实际支付金额退款，优惠券抵扣的部分不退款；如果是按照比例退款，则优惠券也按照比例计算。</p>
<p>3.	退款后优惠券不再可用。</p>`;
            $('.dialog-modal-content').html(text);
        });
        $('.footer-modal-btn, .icon-close').on('click', () => {
            $('.j-dialog').hide();
        });
    },
    initPageControl: () => {
        $('.j-list-text').on('click', () => {
            $('.j-content-table .j-table-tr').children('.u-table-td').removeClass('checked');
            if ($('.j-list-height').css('display') === 'none') {
                $('.j-list-text b').addClass('activeDown').removeClass('activeTop');
            } else {
                $('.j-dl-span span').removeClass('spanchecked');
                $('.j-list-text b').addClass('activeTop').removeClass('activeDown');
            }
            $('.j-list-height').toggle();
            $('.j-price-num span').text(0).hide();
            $('.j-price-num p b').text(0);
            $('.j-price-num i').hide();
            $('.j-dl-input input').val('');
        });
        // table
        $('.j-content-table').on('click', '.j-table-tr', (e) => {
            // 自定义隐藏
            $('.j-list-height').hide();
            $('.j-list-text b').addClass('activeTop').removeClass('activeDown');
            $('.j-dl-span span').removeClass('spanchecked');
            $('.j-dl-input input').val('');
            // 价格
            const productPrice = $(e.currentTarget).children('.u-table-td').last().text();
            const discount = $(e.currentTarget).attr('data-product-discount');
            const mathRoundPrice = Math.round(productPrice * discount * 10);
            $('.j-price-num p b').text(mathRoundPrice / 10);

            if (parseFloat($(e.currentTarget).attr('data-product-discount')) === 1) {
                $('.j-price-num i').hide();
            } else {
                let discountNum = (parseFloat($(e.currentTarget).attr('data-product-discount')) * 100).toString();
                if (discountNum.indexOf(0) !== -1) {
                    discountNum = discountNum.substr(0, 1);
                }
                $('.j-price-num span').text(parseInt($(e.currentTarget).children('.u-table-td').last().text().trim())).show();
                $('.j-price-num i').text(`${discountNum}折`).show();
            }
            // 添加样式
            if ($(e.currentTarget).children('.u-table-td').hasClass('checked')) {
                // 取消点击之后清空课程总价
                $('.j-price-num p b').text(0);
                $(e.currentTarget).children('.u-table-td').removeClass('checked');
                $('.j-price-num span').text(0);
                $('.j-price-num p b').text(0);
            } else {
                $(e.currentTarget).siblings().children('.u-table-td').removeClass('checked');
                $(e.currentTarget).children('.u-table-td').addClass('checked');
            }
        });
        // 鼠标划入 划出
        $('.j-content-table').on('mouseenter', '.j-table-tr', (e) => {
            $(e.currentTarget).siblings().children('.u-table-td').removeClass('tdHover');
            $(e.currentTarget).children('.u-table-td').addClass('tdHover');
        });
        $('.j-content-table').on('mouseleave', '.j-table-tr', (e) => {
            $(e.currentTarget).children('.u-table-td').removeClass('tdHover');
        });
        // 自定义
        $('.j-list-text').on('mouseenter', (e) => {
            $(e.currentTarget).css('color', '#F7AE66');
        });
        $('.j-list-text').on('mouseleave', (e) => {
            $(e.currentTarget).css('color', '#F27900');
        });
        $('.j-dl-span').on('click', 'span', (e) => {
            // 取消选中产品组合
            $('.j-content-table .j-table-tr').children('.u-table-td').removeClass('checked');
            $(e.target).siblings().removeClass('spanchecked');
            $(e.target).addClass('spanchecked');
            $('.j-price-num p b').text(0);
            $('.j-price-num span').text(0).hide();
            $('.j-price-num i').hide();
            $('.j-dl-input input').val('');
        });

        $('.j-dl-input input').on('blur', (e) => {
            const $val = $(e.currentTarget).val();
            const regHour = $val.toString().substr($val.length - 1);
            if ($('.j-dl-input input').val() === '' || parseFloat($('.j-dl-input input').val()) === 0 || regHour === '.') {
                purchaseMgr.clearPagePriceInfo($(e.currentTarget));
                return;
            }
        });
        // 自定义购买
        $('.j-dl-input input').on('input', (e) => {
            let discount = 1;
            let totalPrice = 0;
            let actualPrice = 0;
            if ($('.j-dl-span').css('display') !== 'none') {
                // 开通服务
                if ($('.j-dl-span').children('.spanchecked').length === 0) {
                    // 未选择系统服务
                    alert.Alert({
                        title: '提示',
                        content: '请选择系统服务'
                    });
                    purchaseMgr.clearPagePriceInfo($(e.currentTarget));
                    return;
                }
                // 验证是否输入的只是 0.5 的倍数
                const callbackBolea = purchaseMgr.validateInputNumber($(e.currentTarget));
                if (callbackBolea === false) {
                    return;
                }
                // 打折。取单个服务（如：托福或者雅思）
                discount = $('.j-dl-span').children('.spanchecked').attr('data-product-discount');
                // 计算总价格、应付价格
                const testTypePrice = parseInt($('.j-dl-span').children('.spanchecked').attr('data-product-testTypePrice'));
                const coursePrice = parseFloat($('.j-dl-span').children().attr('data-product-CoursePrice'));
                totalPrice = testTypePrice + coursePrice * parseFloat($(e.currentTarget).val());
            } else {
                // 已开通服务增加课程时长
                // 验证是否输入的只是 0.5 的倍数
                const callbackBolea = purchaseMgr.validateInputNumber($(e.currentTarget));
                if (callbackBolea === false) {
                    return;
                }
                // 打折。取单个服务（如：托福或者雅思）
                discount = $('.j-dl-span').children('[data-product-only=true]').attr('data-product-discount');
                // 计算总价格、应付价格
                totalPrice = parseFloat($('.j-dl-span').children('[data-product-only=true]').attr('data-product-CoursePrice')) * parseFloat($(e.currentTarget).val());
            }
            // 总价
            $('.j-price-num span').text(totalPrice / 100);

            // 应付价格=总价*折扣/100
            actualPrice = totalPrice * parseFloat(discount) / 100;
            // 应付价格(四舍五入，保留一位小数)
            const mathRoundPrice = Math.round(actualPrice * 10);
            $('.j-price-num p b').text(mathRoundPrice / 10);

            // 处理折扣展示
            let discountNum = (parseFloat(discount) * 100).toString();
            if (discountNum.indexOf(0) !== -1) {
                discountNum = discountNum.substr(0, 1);
            }
            $('.j-price-num i').text(`${discountNum}折`);

            // 判断是否展示打折，折扣率为 1 时，隐藏总价、折扣。
            if (parseFloat(discount) === 1) {
                $('.j-price-num span').hide();
                $('.j-price-num i').hide();
            } else {
                $('.j-price-num span').show();
                $('.j-price-num i').show();
            }
        });
        // checkbox
        $('.j-checkbox label').hide();
        $('#checked').attr('checked', false);
        let inputShow = true;
        $('.j-checkbox').on('click', () => {
            $('.j-checkbox').css('border', 'solid 1px #B2B2B2');
            if (inputShow) {
                $('.j-checkbox').css('border', 'solid 1px #F27900');
                $('#checked').attr('checked', 'checked');
                $('.j-checkbox label').show();
                $(this).show();
                inputShow = false;
            } else {
                $('.j-checkbox').css('border', 'solid 1px #B2B2B2');
                $('#checked').attr('checked');
                $('.j-checkbox label').hide();
                $(this).hide();
                inputShow = true;
            }
        });
    },
    getproductCombos: (tar) => {
        tar.addClass('u-tab-checked').siblings().removeClass('u-tab-checked').attr('disabled', 'disabled');
        $('.j-list-height').hide();
        $('.j-content-table').fadeOut(100);
        $('.j-list-dl p').hide();
        $('.j-list-text').hide();
        $('.j-list-dl .j-dl-span').hide();
        $('.u-list-dl').show();
        const form = tar.attr('data-usr-test');
        const SerTestType = sharedUtils.serializeDataToObj($('.j-detail'));
        const array = SerTestType.ServerTestType.split(',');
        $.ajax({
            type: 'GET',
            url: '/product/productToOrder/ajax/productCombos',
            data: {
                testType: form
            },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: res => {
                purchaseMgr.initPageData(res);
                purchaseMgr.initPageCustom(res);
                if (array.indexOf(form) === -1) {
                    $('.j-content-table').fadeIn();
                    $('.j-list-text').show();
                    $('.j-list-dl p').show();
                    $('.j-list-dl .j-dl-span').show();
                    $('.u-list-dl').show();
                } else {
                    $('.j-list-text').hide();
                    $('.j-list-height').fadeIn();
                    $('.j-list-dl').hide();
                }
                tar.siblings().removeAttr('disabled');
            },
            error: () => {
                alert.Alert({
                    title: '错误',
                    content: err.Message
                });
            }
        });
    },
    // 产品组合数据
    initPageData: (res) => {
        $('.u-tr').remove();
        $('.u-table-tr .u-table-td').parent().remove();
        let divs = '';
        const testTOEFLBASE = TestTypeDefine.TestType.TOEFLBASE;
        res.forEach(item => {
            if (item.CombinationType === insideDefine.ProductComboType.Combo) {
                divs += `<div class="u-tr"></div>
                        <div class="u-table-tr j-table-tr" data-product-discount="${item.Discount}">
                        <div class="u-table-td" data-product-Id="${item.Id}" >${item.ProductName}</div>
                        <div class="u-table-td" data-time-length="${item.CourseDuration}">${item.CourseDuration}小时</div>
                        <div class="u-table-td">${item.CoursePrice / 100}/小时</div>`;
                let unitPrice = 0;
                let testStr = '';
                let str = '';
                item.TestPrice.forEach(items => {
                    unitPrice += parseInt(items.Price);
                    if (items.TestType === testTOEFLBASE) {
                        str = items.TestTypeCnName.slice(0, items.TestTypeCnName.length - 1);
                        testStr = `${str}、${testStr}`;
                    } else {
                        testStr += `${items.TestTypeCnName}`;
                    }
                });
                divs += `<div class="u-table-td">${testStr}</div><div class="u-table-td j-td">${unitPrice / 100}</div>
                     <div class="u-table-td">${item.ProductPrice / 100}</div></div>`;
            }
        });
        $('.j-content-table').append(divs);
    },
    // 产品自定义价格
    initPageCustom: (res) => {
        $('.j-dl-span').children().remove();
        let divs = '';
        let productUnitPrice = 0;
        const testTOELF = TestTypeDefine.TestType.TOEFL;
        const testIELTS = TestTypeDefine.TestType.IELTS;
        const testTOEFLBASE = TestTypeDefine.TestType.TOEFLBASE;
        res.forEach((item) => {
            if (item.CombinationType === insideDefine.ProductComboType.SelfDefine) {
                let testTypeCnName = '';
                let testTypePrice = 0;
                item.TestPrice.forEach((items, index) => {
                    if (items.TestType === testTOEFLBASE) {
                        const str = items.TestTypeCnName.slice(0, items.TestTypeCnName.length - 1);
                        testTypeCnName = `${str}${testTypeCnName}`;
                    } else {
                        if (index !== item.TestPrice.length - 1) {
                            testTypeCnName += '+';
                        }
                        testTypeCnName += `${items.TestTypeCnName}`;
                    }
                    testTypePrice += items.Price;
                });
                divs += `<span class="spanActive" data-product-CoursePrice="${item.CoursePrice}" data-product-Id="${item.Id}" data-product-discount="${item.Discount}" 
                data-product-testTypePrice="${testTypePrice}" data-product-productName="${item.ProductName}"`;
                // 续费，课时单价走（托福、雅思）data-product-only=true
                if (item.TestPrice.length === 1 && (item.TestPrice[0].TestType === testTOELF || item.TestPrice[0].TestType === testIELTS)) {
                    divs += 'data-product-only="true">';
                    productUnitPrice = item.CoursePrice;
                } else {
                    divs += 'data-product-only="false">';
                }
                divs += `${testTypeCnName}</span>`;
            }
        });
        $('.j-dl-span').append(divs);
        $('.j-dl-input i b').text(productUnitPrice / 100);
    },
    validateInputNumber: (tar) => {
        const reg = /^\d+\.?[5]?$/;
        if (!reg.test(tar.val())) {
            purchaseMgr.clearPagePriceInfo(tar);
            return false;
        } else if (parseFloat(tar.val()) === 0) {
            purchaseMgr.clearPagePriceInfo();
            return false;
        } else if (tar.val().toString().indexOf('.') === -1 && tar.val().toString().substr(0, 1) === '0') {
            purchaseMgr.clearPagePriceInfo(tar);
            return false;
        }
        return true;
    },
    clearPagePriceInfo: (tar) => {
        if (tar && tar !== undefined) {
            tar.val('');
        }
        $('.j-price-num p b').text(0);
        $('.j-price-num span').text(0).hide();
        $('.j-price-num i').text(`${0}折`).hide();
    }

};

module.exports = purchaseMgr;
