import React, { useEffect } from "react";
import styled from "styled-components";

const Example = () => {

    useEffect(() => {
        const kakao = window['kakao'];
        kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            const location = new kakao.maps.LatLng(37.568228238811, 126.81350044801);
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

export default Example;

const Exam = styled.div`
    width: 80%;
    height: 50rem;
    margin: 0 auto;
    margin-top: 5rem;
`;
