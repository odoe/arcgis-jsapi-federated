export default async function init () {
    const { MapService, Home } = await import('arcgis/components');
    const container = document.getElementById('viewDiv');
    const btnHome = document.getElementById('home')
    const map = new MapService(container);

    map.view.ui.add(btnHome, 'top-right')

    const home = new Home(map.view);

    btnHome.addEventListener('click', () => {
        home.zoomToHomeExtent()
    })
}

init();