import React, { useEffect } from "react";
import styled from "styled-components";

const Map = ({ locationX, locationY }) => {
    useEffect(() => {
        const kakao = window.kakao;
        kakao.maps.load(() => {
            const mapContainer = document.getElementById("map");
            const location = new kakao.maps.LatLng(locationX, locationY);
            const options = {
                center: location,
                level: 3
            };
            const map = new kakao.maps.Map(mapContainer, options);
        });
    }, [locationX, locationY]);

    return (
        <Exam id="map" />
    );
}

const Exam = styled.div`
    width: 80%;
    height: 20em;
    margin-top: 2em;
    margin-left: 3em;
    margin-bottom: 5em;
`;

export default Map;
