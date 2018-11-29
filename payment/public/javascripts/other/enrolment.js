const enrolmentMgr = {
    tabContentGroup: {
        '0': 'u-tab-content-f-checked',
        '1': 'u-tab-content-z-checked',
        '2': 'u-tab-content-zn-checked',
        '3': 'u-tab-content-x-checked'
    },
    initPage: () => {
        enrolmentMgr.initPageCtrls();
        enrolmentMgr.initPageEvents();
    },
    initPageCtrls: () => {
        enrolmentMgr.initInterTab();
    },
    initPageEvents: () => {
    },
    initInterTab: () => {
        let count = 0;
        let interTabImage = setInterval(() => {
            ++count;
            if (count === 4) {
                count = 0;
            }
            enrolmentMgr.setInterTab(count);
        }, 5000);
        $('.u-tab-content-group').on('mouseover mouseout', (event) => {
            if (event.type === 'mouseover') {
                const tab = enrolmentMgr.tabContentGroup;
                $('.u-row-tab ul li').find('.u-tab-content-group').removeClass(`${tab['0']} ${tab['1']} ${tab['2']} ${tab['3']}`);
                const getDomGroup = $(event.currentTarget);
                const tabGroupKey = getDomGroup.attr('data-usr-tab');
                count = parseInt(tabGroupKey);
                getDomGroup.addClass(tab[tabGroupKey]);

                $(event.currentTarget).parents().siblings().find('.u-tab-content-info').css('display', 'none');
                $(event.currentTarget).next().css('display', 'block');
                clearInterval(interTabImage);
            } else if (event.type === 'mouseout') {
                interTabImage = setInterval(() => {
                    ++count;
                    if (count === 4) {
                        count = 0;
                    }
                    enrolmentMgr.setInterTab(count);
                }, 3000);
            }
        });
    },
    setInterTab: (count) => {
        const tab = enrolmentMgr.tabContentGroup;
        $('.u-row-tab ul li').find('.u-tab-content-group').removeClass(`${tab['0']} ${tab['1']} ${tab['2']} ${tab['3']}`);
        const getDomGroup = $('.u-row-tab ul li').eq(count).children('.u-tab-content-group');
        const tabGroupKey = getDomGroup.attr('data-usr-tab');
        getDomGroup.addClass(tab[tabGroupKey]);

        $('.u-row-tab ul li').find('.u-tab-content-info').css('display', 'none');
        $('.u-row-tab ul li').eq(count).children('.u-tab-content-info').css('display', 'block');
    }
};

module.exports = enrolmentMgr;
