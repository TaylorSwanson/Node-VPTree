# Node-VPTree
I needed a way to find similar binary data in a huge collection of data.
In this case, if I had 100,000,000 image thumbprints, I want to find similar images quickly without scanning the entire dataset
and using hamming distance.

## Limitations
Currently this implementation is quite rough and probably needs to be optimized a bit. The data structure exists in memory only,
meaning that the dataset must be able to fit in RAM in order to work comfortably. Also, building the tree is recursive currently
which can cause an overflow in the node call stack when loading a large number of data points.
