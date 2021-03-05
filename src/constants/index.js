import Vue from 'vue'

import Enum from 'vue-enum'

/**
*
*枚举常量
*/
const enumInfo = {

  /**
   *车牌颜色代码
   */
  vehiclePlateColorCode: {
    YELLOW: { value: '2', desc: '黄色' },
    BLUE: { value: '1', desc: '蓝色' },
    BLACK: { value: '3', desc: '黑色' },
    WHITE: { value: '4', desc: '白色' },
    GREEN: { value: '5', desc: '绿色' },
    OTHER: { value: '9', desc: '其他' },
    AGRICULTURAL_YELLOW: { value: '91', desc: '农黄色' },
    AGRICULTURAL_GREEN: { value: '92', desc: '农绿色' },
    YELLOW_GREEN: { value: '93', desc: '黄绿色' },
    GRADIENT_GREEN: { value: '94', desc: '渐变绿' }
  },

  /**
   * 车辆类型
   */
  vehicleType: {
    H10_HEAVY_TRUCK: { value: 'H10', desc: '重型货车' },
    H11_HEAVY_TRUCK: { value: 'H11', desc: '重型普通货车' },
    H12_HEAVY_VAN: { value: 'H12', desc: '重型厢式货车' },
    H13_HEAVY_CLOSED_TRUCK: { value: 'H13', desc: '重型封闭货车' },
    H14_HEAVY_TANK_TRUCK: { value: 'H14', desc: '重型罐式货车' },
    H15_HEAVY_FLATBED_TRUCK: { value: 'H15', desc: '重型平板货车' },
    H16_HEAVY_CONTAINER_TRUCK: { value: 'H16', desc: '重型集装厢车' },
    H17_HEAVY_DUMP_TRUCK: { value: 'H17', desc: '重型自卸货车' },
    H18_HEAVY_SPECIAL_STRUCTURE_TRUCK: { value: 'H18', desc: '重型特殊结构货车' },
    H19_HEAVY_WAREHOUSE_TRUCK: { value: 'H19', desc: '重型仓栅式货车' },
    H20_MEDIUM_TRUCK: { value: 'H20', desc: '中型货车' },
    H21_MEDIUM_SIZED_ORDINARY_TRUCK: { value: 'H21', desc: '中型普通货车' },
    H22_MEDIUM_VAN: { value: 'H22', desc: '中型厢式货车' },
    H23_MEDIUM_CLOSED_TRUCK: { value: 'H23', desc: '中型封闭货车' },
    H24_MEDIUM_TANK_TRUCK: { value: 'H24', desc: '中型罐式货车' },
    H25_MEDIUM_FLAT_TRUCK: { value: 'H25', desc: '中型平板货车' },
    H26_MEDIUM_CONTAINER_TRUCK: { value: 'H26', desc: '中型集装厢车' },
    H27_MEDIUM_DUMP_TRUCK: { value: 'H27', desc: '中型自卸货车' },
    H28_MEDIUM_SPECIAL_STRUCTURE_TRUCK: { value: 'H28', desc: '中型特殊结构货车' },
    H29_MEDIUM_SILO_TRUCK: { value: 'H29', desc: '中型仓栅式货车' },
    H30_LIGHT_TRUCK: { value: 'H30', desc: '轻型货车' },
    H31_LIGHT_ORDINARY_TRUCK: { value: 'H31', desc: '轻型普通货车' },
    H32_LIGHT_VAN: { value: 'H32', desc: '轻型厢式货车' },
    H33_LIGHT_CLOSED_TRUCK: { value: 'H33', desc: '轻型封闭货车' },
    H34_LIGHT_TANK_TRUCK: { value: 'H34', desc: '轻型罐式货车' },
    H35_LIGHT_FLAT_TRUCK: { value: 'H35', desc: '轻型平板货车' },
    H37_LIGHT_DUMP_TRUCK: { value: 'H37', desc: '轻型自卸货车' },
    H38_LIGHT_SPECIAL_STRUCTURE_TRUCK: { value: 'H38', desc: '轻型特殊结构货车' },
    H39_LIGHT_BARN_TRUCK: { value: 'H39', desc: '轻型仓栅式货车' },
    H40__MINIVAN: { value: 'H40', desc: '微型货车' },
    H41_MINI_TRUCK: { value: 'H41', desc: '微型普通货车' },
    H42_MINIVAN: { value: 'H42', desc: '微型厢式货车' },
    H43_MINI_CLOSED_TRUCK: { value: 'H43', desc: '微型封闭货车' },
    H44_MINI_TANK_TRUCK: { value: 'H44', desc: '微型罐式货车' },
    H45_MINI_DUMP_TRUCK: { value: 'H45', desc: '微型自卸货车' },
    H46_MINI_SPECIAL_STRUCTURE_TRUCK: { value: 'H46', desc: '微型特殊结构货车' },
    H47_MINI_BARRIER_TRUCK: { value: 'H47', desc: '微型仓栅式货车' },
    H50_LOW_SPEED_TRUCK: { value: 'H50', desc: '低速货车' },
    H51_ORDINARY_LOW_SPEED_TRUCK: { value: 'H51', desc: '普通低速货车' },
    H52_LOW_SPEED_VAN: { value: 'H52', desc: '厢式低速货车' },
    H53_TANK_LOW_SPEED_TRUCK: { value: 'H53', desc: '罐式低速货车' },
    H54_LOW_SPEED_DUMP_TRUCK: { value: 'H54', desc: '自卸低速货车' },
    H55_WAREHOUSE_TYPE_LOW_SPEED_TRUCK: { value: 'H55', desc: '仓栅式低速货车' },
    Q10_HEAVY_TRACTOR: { value: 'Q10', desc: '重型牵引车' },
    Q11_HEAVY_SEMI_TRAILER_TRACTOR: { value: 'Q11', desc: '重型半挂牵引车' },
    Q12_HEAVY_TRAILER_TRUCK: { value: 'Q12', desc: '重型全挂牵引车' },
    Q20_MEDIUM_TRACTOR: { value: 'Q20', desc: '中型牵引车' },
    Q21_MEDIUM_SIZED_SEMI_TRAILER_TRACTOR: { value: 'Q21', desc: '中型半挂牵引车' },
    Q22_MEDIUM_TRAILER_TRUCK: { value: 'Q22', desc: '中型全挂牵引车' },
    Q30_LIGHT_TRACTOR: { value: 'Q30', desc: '轻型牵引车' },
    Q31_LIGHT_SEMI_TRAILER_TRACTOR: { value: 'Q31', desc: '轻型半挂牵引车' },
    Q32_LIGHT_TRAILER_TRUCK: { value: 'Q32', desc: '轻型全挂牵引车' },
    Z11_LARGE_SCALE_SPECIAL_OPERATION_VEHICLE: { value: 'Z11', desc: '大型专项作业车' },
    Z21_MEDIUM_SPECIAL_OPERATION_VEHICLE: { value: 'Z21', desc: '中型专项作业车' },
    Z31_SMALL_SPECIAL_OPERATION_VEHICLE: { value: 'Z31', desc: '小型专项作业车' },
    Z41_MINI_SPECIAL_OPERATION_VEHICLE: { value: 'Z41', desc: '微型专项作业车' },
    Z51_HEAVY_SPECIAL_OPERATION_VEHICLE: { value: 'Z51', desc: '重型专项作业车' },
    Z71_LIGHT_SPECIAL_OPERATION_VEHICLE: { value: 'Z71', desc: '轻型专项作业车' },
    D11_TROLLEYBUS: { value: 'D11', desc: '无轨电车' },
    D12_TRAM: { value: 'D12', desc: '有轨电车' },
    M10_THREE_WHEELED_MOTORCYCLE: { value: 'M10', desc: '三轮摩托车' },
    M11_ORDINARY_REGULAR_THREE_WHEELED_MOTORCYCLE: { value: 'M11', desc: '普通正三轮摩托车' },
    M12_LIGHTWEIGHT_TRICYCLE: { value: 'M12', desc: '轻便正三轮摩托车' },
    M13_THREE_WHEELED_PASSENGER_MOTORCYCLE: { value: 'M13', desc: '正三轮载客摩托车' },
    M14_THREE_WHEELED_CARGO_MOTORCYCLE: { value: 'M14', desc: '正三轮载货摩托车' },
    M15_SIDE_TRICYCLE: { value: 'M15', desc: '侧三轮摩托车' },
    M20_TWO_WHEELED_MOTORCYCLE: { value: 'M20', desc: '二轮摩托车' },
    M21_ORDINARY_TWO_WHEELED_MOTORCYCLE: { value: 'M21', desc: '普通二轮摩托车' },
    M22_MOPED: { value: 'M22', desc: '轻便二轮摩托车' },
    N11_TRICYCLE: { value: 'N11', desc: '三轮汽车' },
    T11_LARGE_WHEELED_TRACTOR: { value: 'T11', desc: '大型轮式拖拉机' },
    T20_SMALL_TRACTOR: { value: 'T20', desc: '小型拖拉机' },
    T21_SMALL_WHEELED_TRACTOR: { value: 'T21', desc: '小型轮式拖拉机' },
    T22_WALKING_TRACTOR: { value: 'T22', desc: '手扶拖拉机' },
    T23_WALKING_DEFORMATION_CONVEYOR: { value: 'T23', desc: '手扶变形运输机' },
    J11_WHEEL_LOADER: { value: 'J11', desc: '轮式装载机械' },
    J12_WHEEL_EXCAVATOR: { value: 'J12', desc: '轮式挖掘机械' },
    J13_WHEELED_GRADER: { value: 'J13', desc: '轮式平地机械' },
    G10_HEAVY_DUTY_FULL_TRAILER: { value: 'G10', desc: '重型全挂车' },
    G11_HEAVY_DUTY_ORDINARY_FULL_TRAILER: { value: 'G11', desc: '重型普通全挂车' },
    G12_HEAVY_VAN_TRAILER: { value: 'G12', desc: '重型厢式全挂车' },
    G13_HEAVY_TANK_TRAILER: { value: 'G13', desc: '重型罐式全挂车' },
    G14_HEAVY_FLAT_TRAILER: { value: 'G14', desc: '重型平板全挂车' },
    G15_HEAVY_CONTAINER_TRAILER: { value: 'G15', desc: '重型集装箱全挂车' },
    G16_HEAVY_DUTY_DUMP_TRUCK: { value: 'G16', desc: '重型自卸全挂车' },
    G17_HEAVY_RACK_TRAILER: { value: 'G17', desc: '重型仓栅式全挂车' },
    G18_HEAVY_CARAVAN_TRAILER: { value: 'G18', desc: '重型旅居全挂车' },
    G19_HEAVY_SPECIAL_OPERATION_TRAILER: { value: 'G19', desc: '重型专项作业全挂车' },
    G20_MEDIUM_FULL_TRAILER: { value: 'G20', desc: '中型全挂车' },
    G21_MEDIUM_SIZED_ORDINARY_FULL_TRAILER: { value: 'G21', desc: '中型普通全挂车' },
    G22_MEDIUM_VAN_TRAILER: { value: 'G22', desc: '中型厢式全挂车' },
    G23_MEDIUM_TANK_TRAILER: { value: 'G23', desc: '中型罐式全挂车' },
    G24_MEDIUM_FLAT_TRAILER: { value: 'G24', desc: '中型平板全挂车' },
    G25_MEDIUM_CONTAINER_TRAILER: { value: 'G25', desc: '中型集装箱全挂车' },
    G26_MEDIUM_DUMP_TRUCK: { value: 'G26', desc: '中型自卸全挂车' },
    G27_MEDIUM_SIZED_FULL_TRAILER: { value: 'G27', desc: '中型仓栅式全挂车' },
    G28_MEDIUM_CARAVAN_TRAILER: { value: 'G28', desc: '中型旅居全挂车' },
    G29_MEDIUM_SIZED_SPECIAL_OPERATION_FULL_TRAILER: { value: 'G29', desc: '中型专项作业全挂车' },
    G30_LIGHT_FULL_TRAILER: { value: 'G30', desc: '轻型全挂车' },
    G31_LIGHT_ORDINARY_FULL_TRAILER: { value: 'G31', desc: '轻型普通全挂车' },
    G32_LIGHT_VAN_TRAILER: { value: 'G32', desc: '轻型厢式全挂车' },
    G33_LIGHT_TANK_TRAILER: { value: 'G33', desc: '轻型罐式全挂车' },
    G34_LIGHT_FLAT_TRAILER: { value: 'G34', desc: '轻型平板全挂车' },
    G35_LIGHT_DUMP_TRAILER: { value: 'G35', desc: '轻型自卸全挂车' },
    G36_LIGHT_RACK_TRAILER: { value: 'G36', desc: '轻型仓栅式全挂车' },
    G37_LIGHT_CARAVAN_TRAILER: { value: 'G37', desc: '轻型旅居全挂车' },
    G38_FULL_TRAILER_FOR_LIGHT_SPECIAL_OPERATION: { value: 'G38', desc: '轻型专项作业全挂车' },
    B10_HEAVY_SEMI_TRAILER: { value: 'B10', desc: '重型半挂车' },
    B11_HEAVY_DUTY_SEMI_TRAILER: { value: 'B11', desc: '重型普通半挂车' },
    B12_HEAVY_VAN_SEMI_TRAILER: { value: 'B12', desc: '重型厢式半挂车' },
    B13_HEAVY_TANK_SEMITRAILER: { value: 'B13', desc: '重型罐式半挂车' },
    B14_HEAVY_DUTY_FLAT_SEMI_TRAILER: { value: 'B14', desc: '重型平板半挂车' },
    B15_HEAVY_CONTAINER_SEMI_TRAILER: { value: 'B15', desc: '重型集装箱半挂车' },
    B16_HEAVY_DUMP_SEMI_TRAILER: { value: 'B16', desc: '重型自卸半挂车' },
    B17_HEAVY_SPECIAL_STRUCTURE_SEMI_TRAILER: { value: 'B17', desc: '重型特殊结构半挂车' },
    B18_HEAVY_RACK_SEMI_TRAILER: { value: 'B18', desc: '重型仓栅式半挂车' },
    B19_HEAVY_CARAVAN_SEMITRAILER: { value: 'B19', desc: '重型旅居半挂车' },
    B1A_HEAVY_DUTY_SPECIAL_OPERATION_SEMI_TRAILER: { value: 'B1A', desc: '重型专项作业半挂车' },
    B1B_HEAVY_LOW_FLAT_SEMI_TRAILER: { value: 'B1B', desc: '重型低平板半挂车' },
    B20_MEDIUM_SEMI_TRAILER: { value: 'B20', desc: '中型半挂车' },
    B21_MEDIUM_SIZED_ORDINARY_SEMITRAILER: { value: 'B21', desc: '中型普通半挂车' },
    B22_MEDIUM_VAN_SEMITRAILER: { value: 'B22', desc: '中型厢式半挂车' },
    B23_MEDIUM_TANK_SEMITRAILER: { value: 'B23', desc: '中型罐式半挂车' },
    B24_MEDIUM_FLAT_SEMI_TRAILER: { value: 'B24', desc: '中型平板半挂车' },
    B25_MEDIUM_CONTAINER_SEMI_TRAILER: { value: 'B25', desc: '中型集装箱半挂车' },
    B26_MEDIUM_DUMP_SEMI_TRAILER: { value: 'B26', desc: '中型自卸半挂车' },
    B27_MEDIUM_SPECIAL_STRUCTURE_SEMI_TRAILER: { value: 'B27', desc: '中型特殊结构半挂车' },
    B28_MEDIUM_SIZED_GRATE_SEMI_TRAILER: { value: 'B28', desc: '中型仓栅式半挂车' },
    B29_MEDIUM_SIZED_RECREATIONAL_SEMITRAILER: { value: 'B29', desc: '中型旅居半挂车' },
    B2A_MEDIUM_SIZED_SPECIAL_OPERATION_SEMI_TRAILER: { value: 'B2A', desc: '中型专项作业半挂车' },
    B2B_MEDIUM_LOW_FLAT_SEMI_TRAILER: { value: 'B2B', desc: '中型低平板半挂车' },
    B30_LIGHT_SEMI_TRAILER: { value: 'B30', desc: '轻型半挂车' },
    B31_LIGHT_ORDINARY_SEMITRAILER: { value: 'B31', desc: '轻型普通半挂车' },
    B32_LIGHT_VAN_SEMI_TRAILER: { value: 'B32', desc: '轻型厢式半挂车' },
    B33_LIGHT_TANK_SEMITRAILER: { value: 'B33', desc: '轻型罐式半挂车' },
    B34_LIGHT_FLAT_SEMI_TRAILER: { value: 'B34', desc: '轻型平板半挂车' },
    B35_LIGHT_DUMP_SEMI_TRAILER: { value: 'B35', desc: '轻型自卸半挂车' },
    B36_LIGHT_RACK_SEMITRAILER: { value: 'B36', desc: '轻型仓栅式半挂车' },
    B37_LIGHT_CARAVAN_SEMITRAILER: { value: 'B37', desc: '轻型旅居半挂车' },
    B38_LIGHT_SPECIAL_OPERATION_SEMI_TRAILER: { value: 'B38', desc: '轻型专项作业半挂车' },
    B39_LIGHT_LOW_FLAT_SEMI_TRAILER: { value: 'B39', desc: '轻型低平板半挂车' },
    X99_OTHER: { value: 'X99', desc: '其他' }

  },
  /**
   * 车辆能源类型
   */
  vehicleEnergyType: {
    A_GASOLINE: { value: 'A', desc: '汽油' },
    B_DIESEL_OIL: { value: 'B', desc: '柴油' },
    C_ELECTRIC: { value: 'C', desc: '电' },
    D_MIXED_OIL: { value: 'D', desc: '混合油' },
    E_NATURAL_GAS: { value: 'E', desc: '天然气' },
    F_LIQUEFIED_PETROLEUM_GAS: { value: 'F', desc: '液化石油气' },
    L_METHANOL: { value: 'L', desc: '甲醇' },
    M_ETHANOL: { value: 'M', desc: '乙醇' },
    N_SOLAR_ENERGY: { value: 'N', desc: '太阳能' },
    O_HYBRID: { value: 'O', desc: '混合动力' },
    Y_NOTHING: { value: 'Y', desc: '无' },
    Z_OTHER: { value: 'Z', desc: '其他' }
  },

  /**
   * 货物类型
   */
  cargoTypeClassificationType: {
    COAL_AND_PRODUCTS: { value: '0100', desc: '煤炭及制品' },
    OIL_NATURAL_GAS_AND_PRODUCTS: { value: '0200', desc: '石油、天然气及制品' },
    METAL_ORES: { value: '0300', desc: '金属矿石' },
    StEEl: { value: '0400', desc: '钢铁' },
    MINING_CONSTRUCTION_MATERIALS: { value: '0500', desc: '矿建材料' },
    CEMENT: { value: '0600', desc: '水泥' },
    WOOD: { value: '0700', desc: '木材' },
    NON_METALLIC_ORE: { value: '0800', desc: '非金属矿石' },
    FERTILIZERS_AND_PESTICIDES: { value: '0900', desc: '化肥及农药' },
    SALT: { value: '1000', desc: '盐' },
    FOOD: { value: '1100', desc: '粮食' },
    MECHANICAL_EQUIPMENT_ELECTRICAL: { value: '1200', desc: '机械、设备、电器' },
    LIGHT_INDUSTRIAL_RAW_MATERIALS_AND_PRODUCTS: { value: '1300', desc: '轻工原料及制品' },
    NON_FERROUS_METALS: { value: '1400', desc: '有色金属' },
    LIGHT_INDUSTRY_PHARMACEUTICAL_PRODUCTS: { value: '1500', desc: '轻工医药产品' },
    FRESH_AGRICULTURAL_PRODUCTS: { value: '1601', desc: '鲜活农产品' },
    REFRIGERATED_FROZEN_GOODS: { value: '1602', desc: '冷藏冷冻货物' },
    COMMODITY_CAR: { value: '1701', desc: '商品汽车' },
    OTHER: { value: '1700', desc: '其他' }
  }

}

Vue.use(Enum, { enumInfo })
