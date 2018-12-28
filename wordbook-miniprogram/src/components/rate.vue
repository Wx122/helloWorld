<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-rate-wrap">
        <ul class="weui-rate">
          <li class="weui-rate-item" v-for="n in max" ref="index" :key="index" :class="[{'weui-rate-item-active' : index <= value, 'weui-rate-item-active-scale' : (index <= value) && isScale}]" :data-index='index' @click="selectRate(index,$event)">
            <div class="weui-rate-item-def"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    props: ['tempValue', 'Id'],
    data () {
      return {
        max: 3,
        value: 0,
        rateScore: '',
        isScale: true
      }
    },
    computed: {
      ...mapState({
        currentCardIndex: state => state.card.currentCardIndex
      })
    },
    watch: {
      Id (val) {
        this.value = this.tempValue
      }
    },
    onLoad () {
    },
    mounted () {
      this.value = this.tempValue
    },
    methods: {
      ...mapActions('card', [
        'updateFamiliarity'
      ]),
      async selectRate (index, e) {
        this.value = e.mp.currentTarget.dataset.index
        this.isScale = false
        setTimeout(() => {
          this.isScale = true
        }, 0)
        if (parseInt(this.tempValue, 10) === parseInt(e.mp.currentTarget.dataset.index, 10)) {
          return false
        }
        await this.updateFamiliarity({
          userWordBookID: wx.getStorageSync('userWordBookID'),
          SysWordID: this.Id,
          Phase: 1,
          OldFamiliarity: this.tempValue,
          NewFamiliarity: e.mp.currentTarget.dataset.index
        })
      }
    }
  }
</script>

<style>
  .page {
    margin-left: 50%;
    width: 222px;
    transform: translateX(-50%);
  }
  .weui-rate-wrap {
    margin: 10px 15px;
  }
  .weui-rate {
    display: flex;
    width: 225px;
  }
  .weui-rate-item {
    position: relative;
    width: 45px;
    height: 45px;
    flex: 0 1 auto;
    margin-right: 30px;
  }
  .weui-rate-item .weui-rate-item-def {
    position: absolute;
    width: 45px;
    height: 45px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAtCAYAAAAHiIP8AAAAAXNSR0IArs4c6QAABM9JREFUaAXVmc1rnEUcx7O72Zdsqk0iXVthhbwHSqPFgyCCtodWtA3xpZbG6KGehEIPetCLb9jqP2AvFqEtiXoQ21486MFSbBHUU6F5w9UkDcuK7iZtSNLNbvz8Qmd53Dz77MzuPDQZeJh5Zn7zm+93ft+ZnWe2ocGntLa2FhgfHz87Njb2D/l53oM+DdUQ8Mvx5OTkQKFQuKT8B4PB13p6ekbVu83ct9mBwFEn0GKx+L93Z1u9ZV8ikUqlYisrKxnAPaAABgKBFaKR6O7uXlB1tnJfIgGBg04CApY1ESU7LGXbyRcSgDziBhRJuda72ZrUWZcTCzrKevgbECUpKUAiqba2th2k26rORm49EhB4zo2AgBVJ5XK5ARvAnT6sk8C5p2T8kJRVOYmUAJlhxh90zpSzjKSWkVTCpqRsR+KgFwEhQ3ssm81a3aWsktCVCkQ8JeeMnE7Zmpx0pKQAiaRaW1t3JBKJO6quntxmJA5Uk5ICKpJil7ImKWskdKXkIGJNUutymp6efmRpaelJzjYhGYSZWlODyasqO+o31CGRc7RvV7bVcpEUNkP0KVJ2ynq97FYnPlW9YGHifu/r60sF0PJufqCu077hF1Y6bfJ0F1JPByG0H6BbkYDMbwT8+4KNjY2XYSNnna2YsuFw+GKwo6PjL9DvhciPW4kFeH8G7xOdnZ0TpQVFWOSb+CSNn1KObWJCeTagj/i4+gysBcFZIqFAy0Jn1Y9A5DFVt1lyQI+FQqHhrq6u35yYNpCQRghEiMondHqbsrXfEufApmWwnInH4+8kk8ml8r6uJJQRUXmWqMh1S1LV3Yc8DYHjvb2931ca23OW0d1PkUikn86+XLVUAqXqAf8dzx4vAmLrGQnlTPKJiYljROQMT4uz3qfyHbR/kkn8Use/NglxNjU1lVxdXT1HcZ+O8xptrrH7vM5F2x+6/Y1IiFMiESAq75Gf0h3EwO4U0vkACa1vnbr9PNeEmxMGkMPfTbe2euvwPW5KQMY0JnEP6Kv1Aq7Qvya/xnKamZlpWlxclCvKbRWA1FN9NxqNPtze3p4zcWIcCb47nveJgOCO5PP5QRMCYmtMggVdU8h1gdXi30hOc3Nz8YWFBZFSsy6oGuzyzc3NOzle/Kvb1ygSEHjBZwKCO7y8vGwkKSMSDGAkJbbLWzwn6Pcnj3Yq/4OmWkdtEul0WiQki1o3fcups58fr885QsixfkS3I3b7Z2dnH9K11yYxPz9/CKdxDcdy7nmTW4hXlK7l3yHehzlODBGZeQ0fjWzjL2nYrZtok8C6qpQA+Avf7HsrHdw4D31Fez92VzUAVh1P+dDanTKZzDYugeW2u0l1dOaAKvCcBvzH5KvONrcyfoKcv94l/5D2sJuN+CRyu/BZ9RJDKxJy5ehBIEXbM8zy+zoEBDB2RdbKaW4qnuJ10o0EPkM8L7u1lddpkcCZa2gBc4HZehy9y82DceKm4teWlha5afnCrTNfla7jlttqyYnv7RxESleUDCpnm7eYza/LHdb6zhiDjHGW/qVdiXEKRLiJPO/lVysSOLjhcHKF3Ue2TmsExDf+LsZisT0A/kGNBamb1QiIrVYkZM9my3sDh2kW2jfkRTWQ7Rzgcj/8IlJ6lJ1slOsZOeZ4pv8AnKjGyUqKVsYAAAAASUVORK5CYII=);
  }
  .weui-rate-item-active .weui-rate-item-def {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAtCAYAAADoSujCAAAAAXNSR0IArs4c6QAABCFJREFUaAXVWUloFTEY/vKsgpWCguJBxa24W3EpFr2oPdmKB9H24oLoQQQL7nryIIKt1hVxRbB6cAEP7giCXtwRT6KiIOhFPCjiAtq++GWcPJ7zMjNJm7EaGJL58uf//y/5s80IZJRkM2ZTdRufDggsE5twJwtTuSyUhjoPQWIwn6F8DmdlJxMCcicm0umxBadZDrAC4K+QCQGGzKISF01YiZA7kA0BaSBgwtz9LWnhnYDchQm0MqbEErGwzlDVecg7AeTREOtOh2FkYoXtKvwTABbGms5gHnglEIRI8eoTZaJWo98hFq3p9LtXAtyySlefqGs2MtE2Ce9+CdiEiI1MgsPRKm8EuFGN/2PzilrS7783tfH6tau5NwLGzSvOO4+j4I+Ay0blIhvXCSHuhYDcjXHUpx7bNC5sYysfKyfkefTAG9RyA+ofSOUYyTrli8oaN2ES9ZRcpptZ5QKnGHZXA9k8SzrlwrIJUzIaz+ETqnFT8Nx+lsYbdfv/Khe4qPq1/r9yuthZiVo1YJldNoptZVIWOBbEHsNoOQ3s52hUZGLIv9IvyGEtr6knCpNH7sUI/MBpkpjh355HjQL3GDVL6PxrpbVAQL2EK9JWzvRtfC1T2D+U2tnr2zEMO0QDT11h+oOABhlS01g+w9EYrbFuzl+yOxeLDXgU9cO4kYnNeIy+mELh7p/gORxFP0w2Oa/IGEegmKVsQR1D6iSxgcX4Xyi/p40VYku42cUYTCWg2skDGIDvOMGQmh+jxy8scAm9sVI04UOaYisCWglHYyVJ7OPTR2Nec4Gv1L2WvX7cVq8TAaVU7kElfuIKDfmd4AIv0BPzxDq8snVeyRkncZKCwIBMnztJOox11OnqvNLjTEC2YhLbjTI60TVwVKjbSYszAYZP/HcfJ9MG4U7odieADAl0QrcTAQ7xZPZbpaHvfEGVXOnUBmqdnAhkGj7aZek2wm4EPH5N0P4acqc5Zk2Al/CpXPtHGgwmQQdZqR77JDGctqptG1gT4HnIpWfUOaaOO2qTerhYz+W7wuySgy17Avbfci6jHBPp+HXtrdiEGwrj+2WNJeb2tux21GBI2/Ew0SjwjdrW8yh+JEmOd41VDMVWypQnyfFjT43YiAeJMqy0G4G0IRV4QuenpDmvnAlkyjifVJuk1IHGpGpdZ0cgfkjVZ6ZmXn5q6NgLrTQt5+XkuWrD7muhbN4ozxVPWpy5Uk+j/CExnTfQ+yVGBN7SgaUc5tsldQ4A9c8ihTaG1RBDs5mcS3cNeAFKH4E8DUSTwDn0QlVXnVdqAx0VPCAKnI+aYQfNKcEiQPqXB4mnRW0+U+kariptRViXi2I1PlJJIyf4NeYHORr6+1TyPKFwaggp76i4lpJVVHyBsf5OYVklXpgGoR0LaOsZbd1Ks/MLVsbw/H5nz7MAAAAASUVORK5CYII=);

    /*animation: scaleRate 1.5s linear;*/
  }

  .weui-rate-item-active-scale {
    animation: scaleRate 0.8s linear;
  }
  @keyframes scaleRate {
    0% {
      transform: scale(1.2);
    }
    25% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1.0);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1.0);
    }
  }
</style>
