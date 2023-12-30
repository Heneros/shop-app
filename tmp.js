
<>
  <Container maxWidth="md">
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <LinkComponent to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </LinkComponent>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1">
        Edit Product
      </Typography>
      {loadingUpdate && <Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>
      ) : error ? (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error">{error.data.message}</Alert>
        </Snackbar>
      ) : (
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  margin="normal"
                />
                <Input
                  type="file"
                  placeholder="Choose file"
                  label="Choose File"
                  onChange={uploadFileHandler}
                  fullWidth
                />
              </Box>
            </Grid>
            {/* Остальные поля формы */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  </Container>
</>