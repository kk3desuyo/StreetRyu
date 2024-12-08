package ru.streetApp.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import  ru.streetApp.service.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//コントローラーはあくまで、データの変更等は行わずに(内部処理を書かない)serviceのメソッドを呼び出す的な使い方

@RestController
class streetViewRestController {
    //パノラマ画像を返却するためのAPI
    @GetMapping("/api/panorama/{routeId}/{pointId}")
    public ResponseEntity<String> getPanorama(@PathVariable String routeId, @PathVariable int pointId) {
        try {
            return ResponseEntity.ok(routeId+pointId); // ResponseEntityでURLを返す
        } catch (NullPointerException e) {

        } catch (Exception e) {

        }
        return  ResponseEntity.ok(routeId);
    }

}
@Controller
public  class streetViewController{
    @GetMapping("/test")
    public String home() {
        return "forward:/test.html";
    }
}
