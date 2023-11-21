// 맛집 정보 배열
const restaurants = [
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 ",
    "맛집 "
  ];
  
  // HTML에 맛집 목록 추가
  const restaurantListElement = document.getElementById("restaurantList");
  restaurants.forEach((restaurant, index) => {
    const restaurantBox = document.createElement("div");
    restaurantBox.className = "restaurant-box";
    restaurantBox.innerText = `${index + 1}. ${restaurant}`;
    restaurantListElement.appendChild(restaurantBox);
  });
  