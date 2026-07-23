package com.seeni.os.core

import android.content.Context
import android.widget.Toast

object ErrorHandler {
    fun showError(context: Context, message: String) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show()
    }
}
