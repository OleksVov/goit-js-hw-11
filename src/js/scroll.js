
export default function scroll() {
    try{
      const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
      
      window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  }