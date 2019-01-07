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
            filterItems += `<li class="sidebar-list-item" name="${item.name}">${item.name}`;
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

function html_chart_item(i, name, height, date, value, unit) {
    return `<div class="item">
                <div class="item-chart-title" id="item-chart-title-${i}">${name}</div>
                <div class="item-chart-upper" style="height: ${height}px" id="item-chart-upper-${i}"></div>
                <div class="item-chart-lower" id="item-chart-lower-${i}"></div>
                <div class="item-chart-lower-text" id="item-chart-lower-text-${i}">
                    <span class="item-chart-pre">${date}:</span>
                    <span class="item-chart-value"> ${value} </span>
                    <span class="item-chart-unit energy-unit">${unit}</span>
                </div>
            </div>`;
}

