# Sync Product Catalog

First, ensure we have the latest product images in BigCommerce - updates to products/product variants will fail if we attempt to attach an image that doesn't yet exist.

1. Download images fro SS Activewear ([Download](https://cdn.ssactivewear.com/DataLibrary/SNS_Activewear_Images.zip?_gl=1*dpav0w*_ga*NDc2Mzg4MTQ4LjE2OTY2ODgyODc.*_ga_B9ZFD6MJC3*MTcwODAwNTU3MC42NC4xLjE3MDgwMDU2MDIuMjguMC4w))

2. Log into WebDAV (recommend using [Cyberduck](https://cyberduck.io/)). Upload images to the directory `/product_images/uploaded_images/SS/Images`

   (Hint: you can follow BigCommerce's directions [here](https://support.bigcommerce.com/s/article/File-Access-WebDAV?language=en_US))

Next, ensure we have the latest categories to match to product

```
$ yarn sync:categories
```

Now we'll ensure we have the latest products. This won't delete any products that already exist, because we need these for record keeping purposes.

```
$ yarn sync:products
```

Finally, we make sure the latest product variants are synced for each product. Similarly, we won't delete any variants for record keeping purposes.

```
$ yarn sync:product-variants
```

### Bonus

Re-run product sync to update a product's visibility once inventory (product variants) have been synced.

```
$ yarn sync:products
```

Update each product to have optimized descriptions.

```
$ yarn sync:product-descriptions
```
