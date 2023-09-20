import React, { useEffect } from "react";
import styled from "styled-components";

const Map = () => {

    useEffect(() => {
        const kakao = window['kakao'];
        kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            const location = new kakao.maps.LatLng(37.4953666908089, 127.03306536185);
            const options = {
                center: location,
                level: 3
            };
            const map = new kakao.maps.Map(mapContainer, options);
        });
    }, []);

    return (
        <>
            <Exam id="map" />
        </>
    );
}

export default Map;

const Exam = styled.div`
    width: 80%;
    height: 20em;
    /* margin: 0 auto; */
    /* margin-top: 2em; */
    margin-top: 2em;
    margin-left: 3em;
    margin-bottom: 5em;
`;
