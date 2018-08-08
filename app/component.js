export default (text='hello webpack world') => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
}
