// 城市地铁数据管理器
class MetroDataManager {
    constructor() {
        // 城市数据映射
        this.cityData = {
            '广州': GUANGZHOU_METRO
        };
        
        // 城市颜色主题
        this.cityThemes = {
            '广州': '#F6D62A', // 广州地铁标志色
            '深圳': '#009943', // 深圳地铁绿色
            '上海': '#E3002B'  // 上海地铁红色
        };
    }
    
    // 注册城市数据
    registerCity(cityName, metroData) {
        this.cityData[cityName] = metroData;
    }
    
    // 获取城市列表
    getCityList() {
        return Object.keys(this.cityData);
    }
    
    // 获取指定城市的地铁数据
    getMetroData(cityName) {
        return this.cityData[cityName] || null;
    }
    
    // 获取城市主题色
    getCityTheme(cityName) {
        return this.cityThemes[cityName] || '#3498db';
    }
    
    // 获取所有城市的站点
    getAllStations(cityName) {
        const metroData = this.getMetroData(cityName);
        if (!metroData) return [];
        return metroData.getAllStations ? metroData.getAllStations() : [];
    }
    
    // 获取指定城市和线路的站点
    getLineStations(cityName, lineId) {
        const metroData = this.getMetroData(cityName);
        if (!metroData) return [];
        return metroData.getLineStations ? metroData.getLineStations(lineId) : [];
    }
    
    // 获取站点路径
    getPath(cityName, startStation, endStation) {
        const metroData = this.getMetroData(cityName);
        if (!metroData) return [];
        return metroData.getPath ? metroData.getPath(startStation, endStation) : [];
    }
}

// 创建全局实例
const METRO_DATA_MANAGER = new MetroDataManager();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MetroDataManager, METRO_DATA_MANAGER };
}