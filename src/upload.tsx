import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { CircularProgress, Link, Snackbar } from "@material-ui/core";
import NFTStorageExample from "./nft.storage";
import { Alert } from "@material-ui/lab";

export default class DropzoneDialogExample extends Component<
  {},
  {
    open: boolean;
    files: [];
    cid: string;
    showResults: boolean;
    loading: boolean;
    openBar: boolean;
    message: string;
  }
> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      open: false,
      files: [],
      cid: "",
      showResults: false,
      loading: false,
      openBar: false,
      message: "",
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleCloseBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openBar: false });
  };

  async handleSave(files: any) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
      loading: true,
    });
    try {
      const client = new NFTStorageExample();
      const cid = await client.storeToken(files);
      this.setState({ cid: cid, showResults: true });
    } catch (err) {
      this.setState({ openBar: true, message: err.message });
    }
    this.setState({ loading: false });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleOpen.bind(this)}
          >
            {this.state.loading ? (
              <CircularProgress color="inherit" size={25} disableShrink />
            ) : (
              "Upload to NFT Storage"
            )}
          </Button>
          <DropzoneDialog
            open={this.state.open}
            onSave={this.handleSave.bind(this)}
            acceptedFiles={["image/*", "application/pdf", "video/*", "audio/*"]}
            showPreviews={true}
            maxFileSize={104857600}
            onClose={this.handleClose.bind(this)}
          />
        </div>
        <div>
          {this.state.showResults ? (
            <h3>
              Your CID for NFTs on Filecoin & IPFS NFT Storage is on{" "}
              <Link
                href={`https://${this.state.cid}.ipfs.dweb.link`}
                target="_blank"
                rel="noopener"
              >
                https://{this.state.cid}.ipfs.dweb.link
              </Link>
            </h3>
          ) : null}
        </div>
        <Snackbar
          open={this.state.openBar}
          autoHideDuration={3000}
          onClose={this.handleCloseBar}
        >
          <Alert onClose={this.handleCloseBar} severity="error">
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
