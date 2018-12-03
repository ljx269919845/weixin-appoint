 const API_URL = {
    USER_APOINT_LIST: '/medical/user/appoint/list/{userId}',
    USER_APOINT_APPLY: '/medical/user/appoint/{settingId}',
    USER_APOINT_DELETE: '/medical/user/appoint/{appointId}/{status}',
    USER_INFO_UPDATE: '/medical/user/{id}/update',
    USER_APPOINT_DETAL: '/medical/user/appoint/{appointId}',
    USER_LOGIN: '/medical/user/login',
    APPOINT_SET_LIST: '/medical/appoint/setting/list'
};

class Request{
    constructor(){
        this.failedFunc = ()=>{};
        this.host = "http://127.0.0.1:8087"
    }

    post(url, urlParam, queryParam, bodyParam){
        let newUrl = this.buildURL(url, urlParam);
        let queryStr = this.buildQueryParam(queryParam);
        if(queryStr){
            newUrl += ('?' + queryStr);
        }
        let requst = new Response();
        wx.request({
            url:  newUrl,
            method: 'POST',
            data: bodyParam,
            success: requst.handleSuccess.bind(requst),
            fail: this.handleFailed(requst).bind(this)
        });
        return requst;
    }

    get(url, urlParam, queryParam){
        let newUrl = this.buildURL(url, urlParam);
        let queryStr = this.buildQueryParam(queryParam);
        if(queryStr){
            newUrl += ('?' + queryStr);
        }
        let requst = new Response();
        wx.request({
            url: newUrl,
            method: 'GET',
            success: requst.handleSuccess.bind(requst),
            fail: this.handleFailed(requst)
        });
        return requst;
    }

    buildURL(url, urlParam) {
        if (!url) {
            throw Error('url empty');
        }
        let newUrl = url.replace(/\/:([a-zA-Z\-_]+)/g, function(match, p1) {
            if (p1 in urlParam) {
                return '/' + encodeURIComponent(urlParam[p1]) || '';
            }
            throw Error(p1 + '  not match');
        });

        newUrl = newUrl.replace(/\/{([a-zA-Z\-_]+)}/g, function(match, p1) {
            if (p1 in urlParam) {
                return '/' + encodeURIComponent(urlParam[p1]) || '';
            }
            throw Error(p1 + '  not match');
        });
        return this.host + (this.context || '') + newUrl;
    }

    buildQueryParam(queryParam){
        if(!queryParam){
            return null;
        }
        if(typeof queryParam == 'string'){
            return queryParam;
        }
        let query = [];
        for(let name in queryParam){
            query.push(`${name}=` + encodeURIComponent(queryParam[name]));
        }
        if(!query.length){
            return null;
        }
        return query.join('&');
    }

    handleFailed(request){
        let self = this;
        return (error)=>{
            if(request.handleFailed()){
                return;
            }
            if(self.failedFunc){
                self.failedFunc(error);
            }
        };
    }
}

class Response{
    success(func){
        this.successFunc = func;
    }

    failed(func){
        this.failedFunc = func;
    }

    handleSuccess(res){
        if(!this.successFunc){
            return;
        }
        this.successFunc(res.data);
    }

    handleFailed(res){
        if(!this.failedFunc){
            return false;
        }
        this.failedFunc(res);
        return true;
    }
}


class AppointItem {
  constructor(
     timeFrame,
     total,
     realyTotal,
     totalSurplus,
     appointSets
  ) {
    this.timeFrame = timeFrame;
    this.total = total || 0;
    this.realyTotal = realyTotal || 0;
    this.totalSurplus = totalSurplus || 0;
    this.appointSets = [];
  }

   addAppointSet(appointSet) {
    const index = this.appointSets.findIndex(elem => elem.id === appointSet.id);
    if (index >= 0 && appointSet.id) {
      return;
    }
    this.total += appointSet.userNum;
    if (appointSet.doctor.status === 1) {
      this.realyTotal += appointSet.userNum;
      this.totalSurplus += (appointSet.userNum - appointSet.surplusNum);
    }
    this.appointSets.push(appointSet);
  }

   clone() {
    return new AppointItem(this.timeFrame, this.total, this.realyTotal, this.totalSurplus, CommonFuncService.clone(this.appointSets));
  }

  getDeparts(){
    return this.appointSets.map(elem=>{
      return elem.depart;
    })
  }
}

const requst = new Request;
export { requst, API_URL, Response, AppointItem };
