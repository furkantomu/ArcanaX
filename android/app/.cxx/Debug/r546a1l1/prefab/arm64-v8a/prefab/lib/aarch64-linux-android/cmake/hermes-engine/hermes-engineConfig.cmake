if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/muhammedsabanoglu/.gradle/caches/8.9/transforms/a11879f4a45c8b43914ff278e660e606/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/muhammedsabanoglu/.gradle/caches/8.9/transforms/a11879f4a45c8b43914ff278e660e606/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

