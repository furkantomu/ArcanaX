if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/muhammedsabanoglu/.gradle/caches/8.9/transforms/8c86c492e2de93e5f90947fa7dc8b26e/transformed/fbjni-0.7.0/prefab/modules/fbjni/libs/android.x86_64/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/muhammedsabanoglu/.gradle/caches/8.9/transforms/8c86c492e2de93e5f90947fa7dc8b26e/transformed/fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

