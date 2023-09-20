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
                level: 2
            };
            const map = new kakao.maps.Map(mapContainer, options);

            // 마커가 표시될 위치입니다
            var markerPosition  = new kakao.maps.LatLng(locationX, locationY);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 지도에 표시할 원을 생성합니다
            var circle = new kakao.maps.Circle({
                center : new kakao.maps.LatLng(locationX, locationY),  // 원의 중심좌표 입니다
                radius: 50, // 미터 단위의 원의 반지름입니다
                strokeWeight: 5, // 선의 두께입니다
                strokeColor: '#75B8FA', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'dashed', // 선의 스타일 입니다
                fillColor: '#CFE7FF', // 채우기 색깔입니다
                fillOpacity: 0.7  // 채우기 불투명도 입니다
            });

            // 지도에 원을 표시합니다
            circle.setMap(map);


            // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
            var linePath = [
                new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
                new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
                new kakao.maps.LatLng(33.45178067090639, 126.5726886938753)
            ];

            // 지도에 표시할 선을 생성합니다
            var polyline = new kakao.maps.Polyline({
                path: linePath, // 선을 구성하는 좌표배열 입니다
                strokeWeight: 5, // 선의 두께 입니다
                strokeColor: '#FFAE00', // 선의 색깔입니다
                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
            });

            // 지도에 선을 표시합니다
            polyline.setMap(map);


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
