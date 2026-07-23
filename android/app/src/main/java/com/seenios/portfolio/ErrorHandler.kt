package com.seenios.portfolio

import android.content.Context
import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

private const val ERROR_TAG = "ErrorHandler"

fun showError(context: Context, message: String) {
    if (message.isBlank()) return
    logError(message)
    Toast.makeText(context.applicationContext, message, Toast.LENGTH_LONG).show()
}

fun logError(message: String) {
    Log.e(ERROR_TAG, message)
}

@Composable
fun ErrorSnackbarHost(
    snackbarHostState: SnackbarHostState,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.padding(16.dp)
        ) { data ->
            Snackbar(snackbarData = data)
        }
    }
}
