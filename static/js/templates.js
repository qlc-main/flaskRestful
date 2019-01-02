function html_menu_items(menuItemList){

    let menuListHTML = ``;

    menuItemList.forEach(function(menuItem){
        let menuName = menuItem.split(' ').join('-').toLowerCase();
        menuListHTML += `<li id="menu-${menuName}">${menuItem}</li>`;
    })

    return menuListHTML;
}

function html_sidebar_items(filterListObject) {
    let filterListHTML = ``;

    filterListObject.categories.forEach(function (category) {

        let filterItems = ``;

        let labelName = category.name.split(' ').join('-').toLowerCase();

        category.items.forEach(function(item){
            filterItems += `<li class="sidebar-list-item">${item.name}`;
            if(filterListObject.settings.checkbox){
                filterItems += `<input type="checkbox" name="category-${labelName}" value="${item.name}">`;
            }
            filterItems += `</li>`;
        });

        let sortIcon = filterListObject.settings.sortable ? `<i class="sidebar-icon-sort fa fa-arrows-v"></i>` : `&nbsp&nbsp&nbsp`;

        if (filterListObject.settings.sortable){

        }

        let filterCategory =
            `<li>
            <span class="filter-parameter">
                <i class="sidebar-icon-expand fa fa-caret-down"></i>${category.name}${sortIcon}
            </span>
            <ul>
                ${filterItems}
            </ul>
        </li>`;

        filterListHTML += filterCategory;
    });


    return filterListHTML;
}

function html_chart_item(i, name) {
    return `<div class="item">
                <div class="item-power-chart" id="power-chart-${i}"></div>
                <div class="item-energy-chart" id="harmonic-chart-${i}"></div>
                <div class="item-title" id="chart-item-title-${i}">${name}</div>
            </div>`;
}

function html_phase_item(i, name) {
    return `<div class="item">
                <div class="item-phase-chart" id="phase-chart-${i}"></div>
                <div class="item-harmonic-chart" id="harmonic-chart-${i}"></div>
                <div class="item-title" id="phase-item-title-${i}">${name}</div>
            </div>`;
}

function html_meter_item(i, name) {
    return `<div class="item">
                <div class="item-meter-chart" id="meter-chart-${i}"></div>
                <div class="item-energy-chart" id="energy-chart-${i}"></div>
                <div class="item-title" id="meter-item-title-${i}">${name}</div>
            </div>`;
}