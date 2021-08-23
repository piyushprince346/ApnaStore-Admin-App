const linearCategories = (cats, options = []) => {
    for (let cat of cats) {
        options.push({
            value: cat._id,
            name: cat.name,
            parentId: cat.parentId,
            type: cat.type
        });
        if (cat.children.length > 0) {
            linearCategories(cat.children, options);
        }
    }
    return options;
};

export default linearCategories;