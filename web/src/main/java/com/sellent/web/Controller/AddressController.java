package com.sellent.web.Controller;

import com.sellent.web.Entiity.Coordinates;
import com.sellent.web.Service.AddressService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/address")
    public Coordinates address(){
        return addressService.getCoordinate();
    }
}
