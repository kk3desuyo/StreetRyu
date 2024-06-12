package ru.streetApp.service;

import java.util.HashMap;
import java.util.Map;

public class Panorama {
    //ルートデータ一覧
    private static final Map<String,Integer>  route = new HashMap<>(){{
        //ルート名と最大の連番数
        put("RouteA",8);
    }};

    //そのpointIdが有効なものかを確認する
    public static boolean checkValidityPointId(String routeId, int pointId) {
        int correctPointId = route.get(routeId);
        if(pointId < 0)
                return false;

        return pointId <= correctPointId;

    }

}


