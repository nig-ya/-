class Http {
	/********************服务器数据*********************/
	// 请求城市列表
	static citys(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/citys.php',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 请求城市id对应的影院信息
	static cinemas(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/cinemas.json',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 影院列表真实接口数据
	static cinemas_real(cityid, page, callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/demo/Juhe.php',
			data: {
				url: 'http://v.juhe.cn/movie/cinemas.search',
				param: {
					cityid: cityid,
					key: this.key,
					page: page,
					pagesize: 20,
				},
			},
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 影片详情服务器数据
	static movieInfo_real(movieid, callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/demo/Juhe.php',
			data: {
				url: 'http://v.juhe.cn/movie/query',
				param: {
					key: this.key,
					movieid: movieid,
				},
			},
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 影院上映影片信息（购票数据）
	static cinemasMovies(cinemaid, callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/demo/Juhe.php',
			data: {
				url: 'http://v.juhe.cn/movie/cinemas.movies',
				param: {
					key: this.key,
					cinemaid: cinemaid,
				},
			},
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 获取轮播图
	static getSwiper(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/getSwiper.php',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 获取商品列表
	static getSaleGoods(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/saleGoods.json',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	/***********************测试数据************************/
	// 请求影片信息
	static movieInfo(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/movieInfo.json',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
	// 根据城市名称获取城市id
	static getCityIdByName(cityname, callback) {
		wx.request({
			url: `https://www.bestqingshan.top/movie/getCityIdByName.php?cityname=${cityname}`,
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}

	// 影片详情测试数据
	static film(callback) {
		wx.request({
			url: 'https://www.bestqingshan.top/movie/movie.json',
			success(res) {
				callback(res);
			},
			fail(err) {
				callback(err);
			},
		});
	}
}
Http.key = '';

module.exports = Http;
