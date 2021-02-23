import Vue from 'vue'

import Enum from 'vue-enum'

/**
 *
 * 枚举常量
 */
const enumConstants = {

  /**
   * 车牌颜色代码
   */
  vehiclePlateColorCode: {
    BLUE: { value: '1', desc: '蓝色' },
    YELLOW: { value: '2', desc: '黄色' },
    BLACK: { value: '3', desc: '黑色' },
    WHITE: { value: '4', desc: '白色' },
    GREEN: { value: '5', desc: '绿色' },
    OTHER: { value: '9', desc: '其他' },
    AGRICULTURAL_YELLOW: { value: '91', desc: '农黄色' },
    AGRICULTURAL_GREEN: { value: '92', desc: '农绿色' },
    YELLOW_GREEN: { value: '93', desc: '黄绿色' },
    GRADIENT_GREEN: { value: '94', desc: '渐变绿' }
  }
}

Vue.use(Enum, { enumConstants })
