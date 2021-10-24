function (context, args) {
    function upgrades() {
        return #hs.sys.upgrades({full: true});
    }

    function swap(items, leftIndex, rightIndex) {
        if (leftIndex != rightIndex) {
            var temp = items[leftIndex];
            items[leftIndex] = items[rightIndex];
            items[rightIndex] = temp;
            #ms.sys.manage({reorder: [[leftIndex, rightIndex]]});
            #ms.sys.manage({reorder: [[rightIndex - 1, leftIndex]]});
        }
    }

    function partition(items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (items[i].name < pivot.name) {
                i++;
            }
            while (items[j].name > pivot.name) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j); //swapping two elements
                i++;
                j--;
            }
        }
        return i;
    }

    function quickSort(items, left, right) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                quickSort(items, index, right);
            }
        }
        return items;
    }

    var upgs = upgrades();
    upgs = quickSort(upgs, 0, upgs.length - 1);

    var toMove = [];

    for (var i = 0; i < upgs.length; i++) {
        if (upgs[i].loaded) {
            toMove.push([i, 0]);
        }
    }

    #ms.sys.manage({reorder:toMove});
    return {ok:true}
}
