# Node-VPTree
I needed a way to find similar binary data in a huge collection of data. In this case, if I had 100,000,000 image thumbprints, I want to find similar images quickly without scanning the entire dataset and using hamming distance.

## Limitations
Currently this implementation is quite rough and probably needs to be optimized a bit. The data structure exists in memory only, meaning that the dataset must be able to fit in RAM in order to work comfortably. Also, building the tree is recursive which can cause a call stack overflow when loading a large number of data points.

## Why it's awesome
When I run a sample query in a dataset of 10,000,000 binary snippets (128 bytes each), the search takes ~8ms (in memory, so that's not a really good metric). The idea is that this search performed on disk should be much faster than a full scan, since the number of lookups is smaller.
